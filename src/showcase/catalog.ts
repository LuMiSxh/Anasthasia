export type ShowcaseKind = 'matrix' | 'custom';

export interface ShowcaseEntry {
	slug: string;
	name: string;
	category: 'Controls' | 'Feedback' | 'Layout' | 'Supporting UI';
	kind: ShowcaseKind;
	description: string;
}

export const showcaseEntries: ShowcaseEntry[] = [
	{
		slug: 'button',
		name: 'Button',
		category: 'Controls',
		kind: 'matrix',
		description: 'Variants, sizes, loading, and disabled states.'
	},
	{
		slug: 'icon-button',
		name: 'IconButton',
		category: 'Controls',
		kind: 'matrix',
		description: 'Accessible icon-only actions across sizes and intent.'
	},
	{
		slug: 'input',
		name: 'Input',
		category: 'Controls',
		kind: 'matrix',
		description: 'Text inputs, hints, errors, and native states.'
	},
	{
		slug: 'textarea',
		name: 'Textarea',
		category: 'Controls',
		kind: 'matrix',
		description: 'Multiline input states and validation.'
	},
	{
		slug: 'select',
		name: 'Select',
		category: 'Controls',
		kind: 'custom',
		description: 'Portal, search, keyboard, empty, and disabled scenarios.'
	},
	{
		slug: 'toggle',
		name: 'Toggle',
		category: 'Controls',
		kind: 'matrix',
		description: 'Switch states with visible and external labels.'
	},
	{
		slug: 'segmented-control',
		name: 'SegmentedControl',
		category: 'Controls',
		kind: 'matrix',
		description: 'Radio-group behavior, labels, and disabled options.'
	},
	{
		slug: 'alert',
		name: 'Alert',
		category: 'Feedback',
		kind: 'matrix',
		description: 'Semantic intents and live-region behavior.'
	},
	{
		slug: 'badge',
		name: 'Badge',
		category: 'Feedback',
		kind: 'matrix',
		description: 'All status and metadata variants.'
	},
	{
		slug: 'progress-bar',
		name: 'ProgressBar',
		category: 'Feedback',
		kind: 'matrix',
		description: 'Intent, value, custom color, and indeterminate progress.'
	},
	{
		slug: 'spinner',
		name: 'Spinner',
		category: 'Feedback',
		kind: 'matrix',
		description: 'Activity indicators at every control size.'
	},
	{
		slug: 'toast-provider',
		name: 'ToastProvider',
		category: 'Feedback',
		kind: 'custom',
		description: 'Positions, actions, timer pause, and live announcements.'
	},
	{
		slug: 'empty-state',
		name: 'EmptyState',
		category: 'Feedback',
		kind: 'custom',
		description: 'Empty content with optional icon and actions.'
	},
	{
		slug: 'card',
		name: 'Card',
		category: 'Layout',
		kind: 'custom',
		description: 'Static content surfaces and composition.'
	},
	{
		slug: 'interactive-card',
		name: 'InteractiveCard',
		category: 'Layout',
		kind: 'matrix',
		description: 'Button-backed card interaction states.'
	},
	{
		slug: 'link-card',
		name: 'LinkCard',
		category: 'Layout',
		kind: 'custom',
		description: 'Navigation surfaces with native anchor behavior.'
	},
	{
		slug: 'panel',
		name: 'Panel',
		category: 'Layout',
		kind: 'matrix',
		description: 'Header, label, actions, and heading levels.'
	},
	{
		slug: 'field-row',
		name: 'FieldRow',
		category: 'Layout',
		kind: 'matrix',
		description: 'Responsive, horizontal, and vertical field layouts.'
	},
	{
		slug: 'dialog',
		name: 'Dialog',
		category: 'Layout',
		kind: 'custom',
		description: 'Top-layer modal focus and dismissal behavior.'
	},
	{
		slug: 'kbd',
		name: 'Kbd',
		category: 'Supporting UI',
		kind: 'matrix',
		description: 'Keyboard key labels and combinations.'
	},
	{
		slug: 'key-combo-display',
		name: 'KeyComboDisplay',
		category: 'Supporting UI',
		kind: 'matrix',
		description: 'Platform-specific shortcut rendering.'
	},
	{
		slug: 'key-hint-bar',
		name: 'KeyHintBar',
		category: 'Supporting UI',
		kind: 'custom',
		description: 'Scoped shortcut hints and visibility ownership.'
	},
	{
		slug: 'path-display',
		name: 'PathDisplay',
		category: 'Supporting UI',
		kind: 'matrix',
		description: 'Filled, empty, and wrapping path values.'
	},
	{
		slug: 'section-label',
		name: 'SectionLabel',
		category: 'Supporting UI',
		kind: 'matrix',
		description: 'Compact section labels in common contexts.'
	},
	{
		slug: 'tooltip',
		name: 'Tooltip',
		category: 'Supporting UI',
		kind: 'matrix',
		description: 'Portal and inline rendering across every placement.'
	}
];

export const showcaseCategories = ['Controls', 'Feedback', 'Layout', 'Supporting UI'] as const;

export function getShowcaseEntry(slug: string) {
	return showcaseEntries.find((entry) => entry.slug === slug);
}
