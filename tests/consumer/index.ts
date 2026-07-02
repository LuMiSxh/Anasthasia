import type { ComponentProps } from 'svelte';
import {
	Button,
	SegmentedControl,
	Select,
	Tooltip,
	tooltipPortal,
	theme,
	type ButtonVariant,
	type SegmentedControlOption,
	type SelectOption,
	type ThemeMode,
	type TooltipPlacement
} from '../../dist/index.js';
import { keyboard, normalizeCombo, type Platform } from '../../dist/keyboard/index.js';

const variant: ButtonVariant = 'primary';
const buttonProps: ComponentProps<typeof Button> = {
	variant,
	children: (() => undefined) as never
};
const selectOptions: SelectOption<'one' | 'two'>[] = [{ value: 'one', label: 'One' }];
const segmentedOptions: SegmentedControlOption<'one' | 'two'>[] = selectOptions;
const mode: ThemeMode = 'system';
const platform: Platform = 'mac';
const placement: TooltipPlacement = 'top';

void buttonProps;
void selectOptions;
void segmentedOptions;
void Select;
void Tooltip;
void tooltipPortal;
void SegmentedControl;
void keyboard.register('meta+k', () => true);
void normalizeCombo('Command+K');
void platform;
void placement;
theme.setMode(mode);
