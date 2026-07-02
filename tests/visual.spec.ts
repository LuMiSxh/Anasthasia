import { expect, test, type Page } from '@playwright/test';

const flavours = ['Imperial', 'Crimson', 'Spectrum'] as const;
const modes = ['light', 'dark'] as const;

test.describe.configure({ mode: 'serial' });

async function prepare(
	page: Page,
	flavour: (typeof flavours)[number],
	mode: (typeof modes)[number]
) {
	await page.goto(`/?flavour=${flavour.toLowerCase()}&mode=${mode}`);
	await page.locator('main[data-hydrated="true"]').waitFor();

	await page.evaluate(async () => {
		await document.fonts.ready;
		await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
	});
}

for (const flavour of flavours) {
	for (const mode of modes) {
		test(`${flavour} ${mode} visual baseline`, async ({ page }, testInfo) => {
			testInfo.snapshotSuffix = '';
			await prepare(page, flavour, mode);
			await expect(page).toHaveScreenshot(`showcase-${flavour.toLowerCase()}-${mode}.png`, {
				animations: 'disabled',
				fullPage: true,
				maxDiffPixelRatio: 0.01
			});
		});
	}
}

for (const flavour of ['imperial', 'spectrum'] as const) {
	for (const mode of modes) {
		test(`${flavour} Button matrix ${mode} visual baseline`, async ({ page }, testInfo) => {
			testInfo.snapshotSuffix = '';
			await page.goto(`/components/button?flavour=${flavour}&mode=${mode}`);
			await page.locator('main[data-hydrated="true"]').waitFor();
			await page.evaluate(() => document.fonts.ready);
			await expect(page).toHaveScreenshot(`button-matrix-${flavour}-${mode}.png`, {
				animations: 'disabled',
				fullPage: true,
				maxDiffPixelRatio: 0.01
			});
		});
	}
}
