import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { test } from '@playwright/test';
import { showcaseEntries } from '../src/showcase/catalog.js';

const enabled = process.env.SHOWCASE_AUDIT === '1';
const flavours = ['imperial', 'crimson', 'spectrum', 'hypergryph'] as const;
const modes = ['light', 'dark'] as const;

test.skip(!enabled, 'Set SHOWCASE_AUDIT=1 to capture the full visual audit.');

test('capture every component page in every preset palette', async ({ browser }) => {
	test.setTimeout(180_000);
	const root = join(process.cwd(), 'test-results', 'showcase-audit');

	for (const flavour of flavours) {
		for (const mode of modes) {
			const output = join(root, `${flavour}-${mode}`);
			await mkdir(output, { recursive: true });
			const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
			const page = await context.newPage();

			for (const entry of showcaseEntries) {
				await page.goto(`/components/${entry.slug}?flavour=${flavour}&mode=${mode}`);
				await page.locator('main[data-hydrated="true"]').waitFor();
				await page.evaluate(async () => {
					await document.fonts.ready;
					const main = document.querySelector<HTMLElement>('main');
					const body = main?.children[1] as HTMLElement | undefined;
					const content = body?.querySelector<HTMLElement>(':scope > section');
					if (main) {
						main.style.height = 'auto';
						main.style.minHeight = '100vh';
						main.style.overflow = 'visible';
					}
					if (body) {
						body.style.flex = 'none';
						body.style.minHeight = 'auto';
					}
					if (content) content.style.overflow = 'visible';
				});
				await page.waitForTimeout(220);
				await page.screenshot({
					path: join(output, `${entry.slug}.png`),
					fullPage: true,
					animations: 'disabled'
				});
			}

			await context.close();
		}
	}
});
