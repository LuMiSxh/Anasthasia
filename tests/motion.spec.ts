import { expect, test } from '@playwright/test';

test('segmented controls animate an instance-scoped pill', async ({ page }) => {
	await page.goto('/components/segmented-control?flavour=imperial&mode=light');
	await page.locator('main[data-hydrated="true"]').waitFor();
	const firstGroup = page.getByRole('radiogroup').first();
	await page.evaluate(() => {
		const deadline = performance.now() + 1_500;
		function observe() {
			const found = document
				.getAnimations()
				.some((animation) => Number(animation.effect?.getTiming().duration ?? 0) === 200);
			if (found) document.documentElement.dataset.segmentedMotion = 'seen';
			else if (performance.now() < deadline) requestAnimationFrame(observe);
		}
		requestAnimationFrame(observe);
	});
	await firstGroup.getByRole('radio').nth(1).click();
	await expect.poll(() => page.locator('html').getAttribute('data-segmented-motion')).toBe('seen');
});

test('select popup uses the shared entrance motion', async ({ page }) => {
	await page.goto('/components/select?flavour=imperial&mode=light');
	await page.locator('main[data-hydrated="true"]').waitFor();
	await page.getByRole('combobox', { name: 'Format' }).click();
	await page.waitForTimeout(20);
	const durations = await page.evaluate(() =>
		document.getAnimations().map((animation) => Number(animation.effect?.getTiming().duration ?? 0))
	);
	expect(durations).toContain(200);
});
