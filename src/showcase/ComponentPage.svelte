<script lang="ts">
	import { onMount } from 'svelte';
	import { IconArrowRight, IconBolt, IconInbox, IconSettings } from '@tabler/icons-svelte';
	import {
		Alert,
		Badge,
		Button,
		Card,
		Dialog,
		EmptyState,
		FieldRow,
		IconButton,
		Input,
		InteractiveCard,
		LinkCard,
		Panel,
		PathDisplay,
		ProgressBar,
		SectionLabel,
		SegmentedControl,
		Select,
		Spinner,
		Textarea,
		Toggle,
		Tooltip,
		toast,
		type AlertVariant,
		type BadgeVariant,
		type ButtonVariant,
		type ControlSize,
		type ProgressVariant,
		type SpinnerVariant,
		type TooltipPlacement
	} from '$lib/index.js';
	import { Kbd, KeyComboDisplay, KeyHintBar, keyHint, type Platform } from '$lib/keyboard/index.js';
	import type { ShowcaseEntry } from './catalog.js';
	import PropMatrix from './PropMatrix.svelte';
	import Scenario from './Scenario.svelte';

	let { entry }: { entry: ShowcaseEntry } = $props();

	const buttonVariants = ['primary', 'secondary', 'ghost', 'danger'] satisfies ButtonVariant[];
	const sizes = ['sm', 'md', 'lg'] satisfies ControlSize[];
	const alertVariants = ['info', 'success', 'warning', 'danger'] satisfies AlertVariant[];
	const badgeVariants = [
		'default',
		'accent',
		'success',
		'warning',
		'danger',
		'mono'
	] satisfies BadgeVariant[];
	const progressVariants = ['accent', 'success', 'warning', 'danger'] satisfies ProgressVariant[];
	const platforms = ['mac', 'windows', 'linux'] satisfies Platform[];
	const simpleOptions = [
		{ value: 'one', label: 'Option one' },
		{ value: 'two', label: 'Option two' },
		{ value: 'three', label: 'Option three' }
	];
	const optionWithDisabled = [
		{ value: 'one', label: 'Option one' },
		{ value: 'two', label: 'Unavailable', disabled: true },
		{ value: 'three', label: 'Option three' }
	];

	let notes = $state('A multiline value for the component laboratory.');
	let selected = $state('one');
	let segmented = $state('one');
	let checked = $state(true);
	let dialogOpen = $state(false);
	let hintsVisible = $state(true);
	let interactiveCount = $state(0);

	onMount(() => {
		if (entry.slug !== 'key-hint-bar') return;
		return keyHint.register(
			[
				['meta+s', 'Save matrix'],
				['escape', 'Close overlay'],
				['shift+arrowright', 'Next scenario']
			],
			true
		);
	});
</script>

{#if entry.kind === 'matrix'}
	<p class="mb-4 text-xs text-anasthasia-muted">
		Rows and columns are generated from the component's public prop axes. Interactive cells remain
		functional.
	</p>
{/if}

{#if entry.slug === 'button'}
	<div class="grid gap-6">
		<PropMatrix rows={sizes} columns={buttonVariants} cornerLabel="Size / variant">
			{#snippet children(size, variant)}
				<Button size={size as ControlSize} variant={variant as ButtonVariant}
					>{size} {variant}</Button
				>
			{/snippet}
		</PropMatrix>
		<PropMatrix
			rows={['Default', 'Loading', 'Disabled']}
			columns={buttonVariants}
			cornerLabel="State / variant"
		>
			{#snippet children(state, variant)}
				<Button
					variant={variant as ButtonVariant}
					loading={state === 'Loading'}
					disabled={state === 'Disabled'}>{state}</Button
				>
			{/snippet}
		</PropMatrix>
	</div>
{:else if entry.slug === 'icon-button'}
	<PropMatrix rows={sizes} columns={buttonVariants} cornerLabel="Size / variant">
		{#snippet children(size, variant)}
			<IconButton
				label={`${variant} settings`}
				size={size as ControlSize}
				variant={variant as ButtonVariant}><IconSettings size={16} /></IconButton
			>
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'input'}
	<PropMatrix rows={['Default', 'Hint', 'Error', 'Disabled']} columns={['Text', 'Email', 'Number']}>
		{#snippet children(state, type)}
			<Input
				label={`${type} input`}
				type={type.toLowerCase()}
				value={type === 'Number' ? '42' : type === 'Email' ? 'hello@example.com' : 'Anasthasia'}
				hint={state === 'Hint' ? 'Helpful supporting text.' : undefined}
				error={state === 'Error' ? 'Correct this value.' : undefined}
				disabled={state === 'Disabled'}
			/>
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'textarea'}
	<PropMatrix rows={['Default', 'Hint', 'Error', 'Disabled']} columns={['Resizable', 'Fixed']}>
		{#snippet children(state, resize)}
			<Textarea
				label="Notes"
				bind:value={notes}
				hint={state === 'Hint' ? 'Markdown is supported.' : undefined}
				error={state === 'Error' ? 'Notes are too long.' : undefined}
				disabled={state === 'Disabled'}
				class={resize === 'Fixed' ? '[&_textarea]:resize-none' : ''}
			/>
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'toggle'}
	<PropMatrix rows={['Unchecked', 'Checked', 'Disabled']} columns={['Visible label', 'ARIA label']}>
		{#snippet children(state, labelMode)}
			<Toggle
				checked={state === 'Checked'}
				disabled={state === 'Disabled'}
				label={labelMode === 'Visible label' ? `${state} switch` : undefined}
				aria-label={labelMode === 'ARIA label' ? `${state} switch` : undefined}
				hint={labelMode === 'Visible label' ? 'Optional supporting text.' : undefined}
			/>
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'segmented-control'}
	<PropMatrix
		rows={['Default', 'Disabled option', 'Disabled control']}
		columns={['Labelled', 'ARIA label']}
	>
		{#snippet children(state, labelMode)}
			<SegmentedControl
				options={state === 'Disabled option' ? optionWithDisabled : simpleOptions}
				bind:value={segmented}
				label={labelMode === 'Labelled' ? 'Density' : undefined}
				ariaLabel={labelMode === 'ARIA label' ? 'Density' : undefined}
				disabled={state === 'Disabled control'}
			/>
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'alert'}
	<PropMatrix
		rows={['Body only', 'With title', 'Polite live']}
		columns={alertVariants}
		cornerLabel="Content / intent"
	>
		{#snippet children(content, variant)}
			<Alert
				variant={variant as AlertVariant}
				title={content === 'With title' ? variant : undefined}
				live={content === 'Polite live' ? 'polite' : 'off'}>Contextual {variant} feedback.</Alert
			>
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'badge'}
	<PropMatrix rows={['Status', 'Version']} columns={badgeVariants} cornerLabel="Content / variant">
		{#snippet children(content, variant)}
			<Badge variant={variant as BadgeVariant}>{content === 'Version' ? 'v0.2.0' : variant}</Badge>
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'progress-bar'}
	<PropMatrix
		rows={['20%', '65%', 'Indeterminate']}
		columns={progressVariants}
		cornerLabel="Value / intent"
	>
		{#snippet children(value, variant)}
			<ProgressBar
				label={`${variant} ${value}`}
				variant={variant as ProgressVariant}
				value={value === 'Indeterminate' ? undefined : Number.parseInt(value) / 100}
			/>
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'spinner'}
	<PropMatrix rows={progressVariants} columns={sizes} cornerLabel="Intent / size">
		{#snippet children(variant, size)}
			<Spinner
				label={`${variant} ${size} loading`}
				size={size as ControlSize}
				variant={variant as SpinnerVariant}
			/>
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'interactive-card'}
	<PropMatrix rows={['Default', 'Disabled']} columns={['Text', 'Icon']}>
		{#snippet children(state, content)}
			<InteractiveCard disabled={state === 'Disabled'} onclick={() => (interactiveCount += 1)}>
				<div class="flex items-center justify-between gap-3">
					<div>
						<div class="font-bold">Interactive surface</div>
						<div class="mt-1 text-xs text-anasthasia-muted">
							Activated {interactiveCount} times.
						</div>
					</div>
					{#if content === 'Icon'}<IconArrowRight size={18} />{/if}
				</div>
			</InteractiveCard>
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'panel'}
	<PropMatrix
		rows={['Title', 'Label + title', 'With action']}
		columns={['H2', 'H3', 'H4']}
		cornerLabel="Header / heading"
	>
		{#snippet children(header, level)}
			{#if header === 'With action'}
				<Panel
					title="Panel title"
					headingLevel={Number(level.slice(1)) as 2 | 3 | 4}
					animate={false}
				>
					{#snippet actions()}<Button size="sm">Action</Button>{/snippet}
					<p class="text-sm text-anasthasia-muted">Semantic panel content.</p>
				</Panel>
			{:else}
				<Panel
					title="Panel title"
					label={header === 'Label + title' ? 'Category' : undefined}
					headingLevel={Number(level.slice(1)) as 2 | 3 | 4}
					animate={false}
				>
					<p class="text-sm text-anasthasia-muted">Semantic panel content.</p>
				</Panel>
			{/if}
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'field-row'}
	<PropMatrix
		rows={['responsive', 'horizontal', 'vertical']}
		columns={['Toggle', 'Select']}
		cornerLabel="Orientation / control"
	>
		{#snippet children(orientation, control)}
			<FieldRow
				label="Automatic updates"
				hint="A description that may wrap on narrow surfaces."
				orientation={orientation as 'responsive' | 'horizontal' | 'vertical'}
			>
				{#if control === 'Toggle'}<Toggle aria-label="Automatic updates" bind:checked />
				{:else}<Select
						ariaLabel="Update channel"
						options={simpleOptions}
						bind:value={selected}
					/>{/if}
			</FieldRow>
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'kbd'}
	<PropMatrix rows={['Modifier', 'Character', 'Navigation']} columns={['Single', 'Sequence']}>
		{#snippet children(kind, amount)}
			<div class="flex gap-1">
				<Kbd>{kind === 'Modifier' ? '⌘' : kind === 'Character' ? 'K' : '→'}</Kbd>
				{#if amount === 'Sequence'}<Kbd>Shift</Kbd>{/if}
			</div>
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'key-combo-display'}
	<PropMatrix
		rows={['meta+k', 'ctrl+shift+arrowright', 'alt+enter']}
		columns={platforms}
		cornerLabel="Combo / platform"
	>
		{#snippet children(combo, platform)}<KeyComboDisplay
				{combo}
				platform={platform as Platform}
			/>{/snippet}
	</PropMatrix>
{:else if entry.slug === 'path-display'}
	<PropMatrix rows={['Filled', 'Empty', 'Long']} columns={['Default', 'Narrow']}>
		{#snippet children(state, width)}
			<PathDisplay
				class={width === 'Narrow' ? 'max-w-48' : ''}
				value={state === 'Filled'
					? '/Users/luca/Documents/project'
					: state === 'Long'
						? '/Users/luca/Documents/projects/Anasthasia/src/lib/components/PathDisplay.svelte'
						: null}
				empty="Nothing selected"
			/>
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'section-label'}
	<PropMatrix rows={['Plain', 'Panel', 'Accent surface']} columns={['Short', 'Long label']}>
		{#snippet children(context, length)}
			<div
				class="rounded-anasthasia-md p-3 {context === 'Panel'
					? 'bg-anasthasia-panel'
					: context === 'Accent surface'
						? 'bg-anasthasia-accent/10'
						: ''}"
			>
				<SectionLabel>{length === 'Short' ? 'Details' : 'Advanced configuration'}</SectionLabel>
			</div>
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'tooltip'}
	<PropMatrix
		rows={['Portalled (default)', 'Inline']}
		columns={['top', 'right', 'bottom', 'left']}
		cornerLabel="Rendering / placement"
	>
		{#snippet children(row, placement)}
			<div data-matrix-row={row}>
				<Tooltip
					content={`${placement} tooltip`}
					placement={placement as TooltipPlacement}
					portal={row !== 'Inline'}
				>
					<Button>Focus or hover</Button>
				</Tooltip>
			</div>
		{/snippet}
	</PropMatrix>
{:else if entry.slug === 'select'}
	<div class="grid gap-4 lg:grid-cols-2">
		<Scenario
			title="Standard list"
			description="Arrow keys, Home, End, Enter, and Escape keep focus on the combobox."
			><Select label="Format" options={simpleOptions} bind:value={selected} /></Scenario
		>
		<Scenario
			title="Searchable list"
			description="Typing filters while aria-activedescendant tracks the active option."
			><Select label="Chapter" search options={simpleOptions} bind:value={selected} /></Scenario
		>
		<Scenario title="Disabled options"
			><Select label="Channel" options={optionWithDisabled} bind:value={selected} /></Scenario
		>
		<Scenario title="Empty and disabled"
			><div class="grid gap-3">
				<Select label="Empty" options={[]} value="" /><Select
					label="Disabled"
					disabled
					options={simpleOptions}
					bind:value={selected}
				/>
			</div></Scenario
		>
	</div>
{:else if entry.slug === 'toast-provider'}
	<Scenario
		title="Notification queue"
		description="The root provider exposes position, maximum visible count, pause-on-hover, actions, and live regions."
	>
		<div class="flex flex-wrap gap-2">
			{#each alertVariants as variant (variant)}
				<Button
					variant={variant === 'danger' ? 'danger' : 'secondary'}
					onclick={() =>
						toast[variant](`${variant} notification`, {
							title: variant,
							actionLabel: 'Undo',
							action: () => toast.info('Action handled')
						})}>{variant}</Button
				>
			{/each}
			<Button onclick={() => toast.clear()}>Clear all</Button>
		</div>
	</Scenario>
{:else if entry.slug === 'empty-state'}
	<div class="grid gap-4 lg:grid-cols-2">
		<Scenario title="Minimal"
			><EmptyState title="No results" description="Try changing the current filters." /></Scenario
		>
		<Scenario title="With icon and action">
			<EmptyState title="Inbox is empty" description="New activity will appear here.">
				{#snippet icon()}<IconInbox size={30} />{/snippet}
				{#snippet actions()}<Button variant="primary">Create item</Button>{/snippet}
			</EmptyState>
		</Scenario>
	</div>
{:else if entry.slug === 'card'}
	<div class="grid gap-4 lg:grid-cols-2">
		<Scenario title="Content composition"
			><Card
				><SectionLabel>Metadata</SectionLabel>
				<h2 class="mt-2 font-bold">Static card</h2>
				<p class="mt-1 text-sm text-anasthasia-muted">
					Cards never become interactive implicitly.
				</p></Card
			></Scenario
		>
		<Scenario title="Nested content"
			><Card
				><div class="flex items-center gap-3">
					<Badge variant="success">Ready</Badge><span class="text-sm"
						>Composable status content</span
					>
				</div></Card
			></Scenario
		>
	</div>
{:else if entry.slug === 'link-card'}
	<Scenario title="Native navigation surface"
		><LinkCard href="#link-card-target"
			><div class="flex items-center justify-between">
				<div>
					<div class="font-bold">Open destination</div>
					<div class="text-xs text-anasthasia-muted">
						Preserves anchor semantics and modifier-click behavior.
					</div>
				</div>
				<IconArrowRight />
			</div></LinkCard
		>
		<div id="link-card-target" class="mt-6 text-xs text-anasthasia-muted">
			Anchor target
		</div></Scenario
	>
{:else if entry.slug === 'dialog'}
	<Scenario
		title="Modal lifecycle"
		description="Open the dialog, tab through it, dismiss it, and verify focus returns here."
	>
		<Button onclick={() => (dialogOpen = true)}>Open dialog</Button>
		<Dialog
			bind:open={dialogOpen}
			title="Confirm operation"
			description="The browser top layer makes background content inert."
		>
			<Input label="Confirmation name" placeholder="Type a value" />
			{#snippet footer()}<Button variant="ghost" onclick={() => (dialogOpen = false)}>Cancel</Button
				><Button variant="primary" onclick={() => (dialogOpen = false)}>Confirm</Button>{/snippet}
		</Dialog>
	</Scenario>
{:else if entry.slug === 'key-hint-bar'}
	<div class="grid gap-4">
		<Scenario title="Application-owned visibility"
			><Toggle label="Show key hints" bind:checked={hintsVisible} /></Scenario
		>
		<Scenario title="Embedded preview"
			><div class="overflow-hidden rounded-anasthasia-lg border border-anasthasia-border">
				<div class="h-24 bg-anasthasia-panel p-4 text-sm text-anasthasia-muted">
					Focus scopes can replace global hints.
				</div>
				<KeyHintBar visible={hintsVisible} />
			</div></Scenario
		>
	</div>
{:else}
	<Scenario title="Component scenario"
		><div class="flex items-center gap-3">
			<IconBolt /><span>No showcase renderer is registered.</span>
		</div></Scenario
	>
{/if}
