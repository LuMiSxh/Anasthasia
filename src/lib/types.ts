export type Intent = 'info' | 'success' | 'warning' | 'danger';
export type ControlSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'mono';
export type AlertVariant = Intent;
export type ProgressVariant = 'accent' | 'success' | 'warning' | 'danger';
export type SpinnerVariant = ProgressVariant;
export type ToastVariant = Intent;
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type ThemeMode = 'light' | 'dark' | 'system';
export type Platform = 'mac' | 'windows' | 'linux';
export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface SelectOption<T extends string = string> {
	value: T;
	label: string;
	disabled?: boolean;
}

export interface SegmentedControlOption<T extends string = string> {
	value: T;
	label: string;
	disabled?: boolean;
}

export interface ToastOptions {
	variant?: ToastVariant;
	title?: string;
	timeout?: number;
	actionLabel?: string;
	action?: () => void;
}
