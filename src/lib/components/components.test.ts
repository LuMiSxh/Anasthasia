import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Input from './Input.svelte';
import ProgressBar from './ProgressBar.svelte';
import SegmentedControl from './SegmentedControl.svelte';

describe('form accessibility', () => {
	it('connects input errors to the control', () => {
		render(Input, { label: 'Name', error: 'Required' });
		const input = screen.getByRole('textbox', { name: 'Name' });
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toHaveAccessibleDescription('Required');
	});

	it('exposes determinate and indeterminate progress', async () => {
		const { rerender } = render(ProgressBar, { label: 'Import', value: 0.42 });
		expect(screen.getByRole('progressbar', { name: 'Import' })).toHaveAttribute(
			'aria-valuenow',
			'42'
		);
		await rerender({ label: 'Import', value: undefined });
		expect(screen.getByRole('progressbar', { name: 'Import' })).not.toHaveAttribute(
			'aria-valuenow'
		);
	});
});

describe('SegmentedControl', () => {
	it('uses radio semantics and supports arrow navigation', async () => {
		const onchange = vi.fn();
		render(SegmentedControl, {
			ariaLabel: 'Density',
			value: 'compact',
			options: [
				{ value: 'compact', label: 'Compact' },
				{ value: 'comfortable', label: 'Comfortable' }
			],
			onchange
		});
		const compact = screen.getByRole('radio', { name: 'Compact' });
		expect(compact).toHaveAttribute('aria-checked', 'true');
		await fireEvent.keyDown(compact, { key: 'ArrowRight' });
		expect(onchange).toHaveBeenCalledWith('comfortable');
		expect(screen.getByRole('radio', { name: 'Comfortable' })).toHaveFocus();
	});
});
