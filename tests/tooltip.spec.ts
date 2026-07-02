import { expect, test } from '@playwright/test';

test('tooltip portals to the top layer and stays inside the viewport', async ({ page }) => {
	await page.goto('/components/tooltip?flavour=imperial&mode=light');
	await page.locator('main[data-hydrated="true"]').waitFor();
	await page.getByRole('button', { name: 'Focus or hover' }).first().hover();

	const tooltip = page.getByRole('tooltip', { name: 'top tooltip' });
	await expect(tooltip).toBeVisible();
	const state = await tooltip.evaluate((node) => {
		const rect = node.getBoundingClientRect();
		return {
			isBodyChild: node.parentElement === document.body,
			zIndex: getComputedStyle(node).zIndex,
			placement: node.getAttribute('data-placement'),
			insideViewport:
				rect.left >= 0 && rect.top >= 0 && rect.right <= innerWidth && rect.bottom <= innerHeight
		};
	});

	expect(state).toEqual({
		isBodyChild: true,
		zIndex: '10000',
		placement: 'top',
		insideViewport: true
	});
});
