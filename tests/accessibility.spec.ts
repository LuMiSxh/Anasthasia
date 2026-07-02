import { expect, test } from '@playwright/test';
import axe, { type AxeResults } from 'axe-core';
import { showcaseEntries } from '../src/showcase/catalog.js';

async function waitForHydration(page: import('@playwright/test').Page) {
	await page.locator('main[data-hydrated="true"]').waitFor();
}

test('showcase has no serious accessibility violations', async ({ page }) => {
	await page.goto('/');
	await waitForHydration(page);
	await page.addScriptTag({ content: axe.source });
	const violations = await page.evaluate(async () => {
		const result = await (
			window as typeof window & {
				axe: { run: () => Promise<AxeResults> };
			}
		).axe.run();
		return result.violations
			.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')
			.map((violation) => ({
				id: violation.id,
				impact: violation.impact,
				targets: violation.nodes.map((node) => node.target.join(' '))
			}));
	});
	expect(violations).toEqual([]);
});

test('dialog restores focus to its invoker', async ({ page }) => {
	await page.goto('/components/dialog');
	await waitForHydration(page);
	const trigger = page.getByRole('button', { name: 'Open dialog' });
	await trigger.click();
	const dialog = page.getByRole('dialog');
	await expect(dialog).toBeVisible();
	await dialog.getByRole('button', { name: 'Close dialog' }).click();
	await expect(trigger).toBeFocused();
});

test('every component page renders its matrix or custom scenario without serious violations', async ({
	page
}) => {
	const failures: Array<{ component: string; violations: string[] }> = [];
	for (const entry of showcaseEntries) {
		await page.goto(`/components/${entry.slug}?flavour=imperial&mode=light`);
		await waitForHydration(page);
		await expect(page.getByRole('heading', { level: 1, name: entry.name })).toBeVisible();
		if (entry.kind === 'matrix') await expect(page.getByRole('table').first()).toBeVisible();
		await page.addScriptTag({ content: axe.source });
		const violations = await page.evaluate(async () => {
			const result = await (
				window as typeof window & { axe: { run: () => Promise<AxeResults> } }
			).axe.run();
			return result.violations
				.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')
				.map((violation) => violation.id);
		});
		if (violations.length) failures.push({ component: entry.name, violations });
	}
	expect(failures).toEqual([]);
});
