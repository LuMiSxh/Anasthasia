<script lang="ts">
	import { onMount } from 'svelte';
	import imperialUrl from '$lib/flavours/imperial.css?url';
	import {
		Alert,
		Badge,
		Button,
		Card,
		Dialog,
		FieldRow,
		Input,
		Kbd,
		KeyComboDisplay,
		KeyHintBar,
		Panel,
		PathDisplay,
		ProgressBar,
		SectionLabel,
		SegmentedControl,
		Select,
		Toggle,
		ToastProvider,
		keyHint,
		softCollapse,
		theme,
		toast,
		uiPrefs
	} from '$lib/index.js';

	type Flavour = 'none' | 'imperial';
	type Palette = 'light' | 'dark';
	type Density = 'compact' | 'comfortable' | 'spacious';
	type Format = 'avif' | 'webp' | 'original';
	type Container = 'cbz' | 'epub' | 'raw';

	const badgeVariants = ['default', 'accent', 'success', 'warning', 'danger', 'mono'] as const;
	const alertVariants = ['info', 'success', 'warning', 'danger'] as const;
	const buttonVariants = ['primary', 'secondary', 'ghost', 'danger'] as const;
	const buttonSizes = ['sm', 'md', 'lg'] as const;
	const progressVariants = ['accent', 'success', 'warning', 'danger'] as const;

	const densityOptions: { value: Density; label: string }[] = [
		{ value: 'compact', label: 'Compact' },
		{ value: 'comfortable', label: 'Comfort' },
		{ value: 'spacious', label: 'Spacious' }
	];

	const formatOptions: { value: Format; label: string }[] = [
		{ value: 'avif', label: 'AVIF' },
		{ value: 'webp', label: 'WebP' },
		{ value: 'original', label: 'Original' }
	];

	const containerOptions: { value: Container; label: string }[] = [
		{ value: 'cbz', label: 'CBZ' },
		{ value: 'epub', label: 'EPUB' },
		{ value: 'raw', label: 'Raw' }
	];

	const flavourOptions: { value: Flavour; label: string }[] = [
		{ value: 'none', label: 'None' },
		{ value: 'imperial', label: 'Imperial' }
	];

	let flavour = $state<Flavour>('imperial');
	let title = $state('Anasthasia');
	let density = $state<Density>('compact');
	let format = $state<Format>('avif');
	let container = $state<Container>('cbz');
	let checked = $state(true);
	let disabledToggle = $state(false);
	let showAdvanced = $state(true);
	let dialogOpen = $state(false);
	let palette = $derived<Palette>(theme.dark ? 'dark' : 'light');

	onMount(() => {
		theme.init();
		uiPrefs.showKeyHints = true;
		return keyHint.register([
			['meta+keyd', 'Toggle dark mode'],
			['meta+keys', 'Save preview'],
			['shift+arrowright', 'Next section']
		]);
	});

	function setPalette(value: Palette) {
		if ((value === 'dark') !== theme.dark) theme.toggle();
	}
</script>

<svelte:head>
	<title>Anasthasia Showcase</title>
	{#if flavour === 'imperial'}
		<link rel="stylesheet" href={imperialUrl} />
	{/if}
</svelte:head>

<main class="min-h-screen bg-anasthasia-bg text-anasthasia-text">
	<div class="mx-auto flex max-w-5xl flex-col gap-6 px-8 py-8">
		<header class="flex items-start justify-between gap-6 border-b border-anasthasia-border pb-5">
			<div>
				<div class="text-xl font-bold">Anasthasia</div>
				<p class="mt-1 max-w-2xl text-sm text-anasthasia-muted">
					Reusable SvelteKit components, styling tokens, and motion primitives for Thasia and future
					apps.
				</p>
			</div>
			<div class="flex shrink-0 items-center gap-3">
				<Select options={flavourOptions} bind:value={flavour} />
				<Toggle
					label={theme.dark ? 'Dark mode' : 'Light mode'}
					checked={theme.dark}
					onchange={(next) => setPalette(next ? 'dark' : 'light')}
				/>
				<Badge variant="accent">v0.0.1</Badge>
			</div>
		</header>

		<div class="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
			<Panel label="Foundation" title="Tokens and Theme">
				{#snippet actions()}
					<Badge variant="mono">Tailwind v4</Badge>
				{/snippet}

				<div class="flex flex-col gap-4">
					<SegmentedControl
						label="Palette"
						options={[
							{ value: 'light', label: 'Light' },
							{ value: 'dark', label: 'Dark' }
						]}
						value={palette}
						onchange={(value) => setPalette(value === 'dark' ? 'dark' : 'light')}
					/>

					<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
						<div class="rounded-lg border border-anasthasia-border bg-anasthasia-bg p-3">
							<SectionLabel>Background</SectionLabel>
						</div>
						<div class="rounded-lg border border-anasthasia-border bg-anasthasia-surface p-3">
							<SectionLabel>Surface</SectionLabel>
						</div>
						<div class="rounded-lg border border-anasthasia-border bg-anasthasia-panel p-3">
							<SectionLabel>Panel</SectionLabel>
						</div>
						<div class="rounded-lg border border-anasthasia-accent/30 bg-anasthasia-accent/10 p-3">
							<SectionLabel class="text-anasthasia-accent">Accent</SectionLabel>
						</div>
					</div>

					<FieldRow
						label="Density"
						hint="Segmented controls use the shared moving pill transition."
					>
						<SegmentedControl options={densityOptions} bind:value={density} />
					</FieldRow>
				</div>
			</Panel>

			<Panel label="Typography" title="Classless Defaults">
				<div class="flex flex-col gap-3">
					<div>
						<h1>Heading One</h1>
						<h2>Heading Two</h2>
						<h3>Heading Three</h3>
					</div>
					<p>
						Paragraph text defaults to compact muted body copy. Links like
						<span class="text-anasthasia-accent"> this example</span> inherit the accent token.
					</p>
					<small>Small text is reserved for captions, hints, and secondary metadata.</small>
					<code>/Users/Luca/Documents/Projekte/Anasthasia</code>
					<div class="flex flex-wrap gap-2">
						<span class="anasthasia-label">Label Utility</span>
						<span class="anasthasia-caption">Caption Utility</span>
						<span class="anasthasia-mono">Mono Utility</span>
						<Badge variant="accent">Light accent: #c89520</Badge>
					</div>
				</div>
			</Panel>
		</div>

		<div class="grid gap-4 lg:grid-cols-[1fr_1fr]">
			<Panel label="Feedback" title="Badges and Alerts">
				<div class="flex flex-col gap-4">
					<div class="flex flex-wrap gap-2">
						{#each badgeVariants as variant (variant)}
							<Badge {variant}>{variant}</Badge>
						{/each}
					</div>

					<div class="grid gap-2">
						{#each alertVariants as variant (variant)}
							<Alert {variant} title={variant}>
								{variant === 'danger'
									? 'Use for blocking failures or destructive confirmation.'
									: 'Use for concise contextual feedback inside dense workflows.'}
							</Alert>
						{/each}
					</div>
				</div>
			</Panel>

			<Panel label="Overlays" title="Dialogs and Toasts">
				<div class="flex flex-col gap-4">
					<p>
						Dialogs use a fading backdrop and rise-in panel. Toasts stack from the lower right and
						reuse the shared feedback variants.
					</p>
					<div class="flex flex-wrap gap-2">
						<Button onclick={() => (dialogOpen = true)}>Open dialog</Button>
						<Button
							variant="ghost"
							onclick={() =>
								toast.info('The preview toast uses the shared provider.', {
									title: 'Info',
									actionLabel: 'Action',
									action: () => toast.success('Toast action completed.', { title: 'Success' })
								})}>Info toast</Button
						>
						<Button
							variant="primary"
							onclick={() =>
								toast.success('Defaults saved for the current preview.', { title: 'Saved' })}
							>Success toast</Button
						>
						<Button
							variant="danger"
							onclick={() =>
								toast.danger('Conversion settings need attention.', { title: 'Error' })}
							>Error toast</Button
						>
					</div>
				</div>
			</Panel>
		</div>

		<Panel label="Actions" title="Button Variants and Sizes">
			<div class="grid gap-4">
				{#each buttonVariants as variant (variant)}
					<div class="flex flex-wrap items-center gap-2">
						<SectionLabel class="w-20">{variant}</SectionLabel>
						{#each buttonSizes as size (size)}
							<Button {variant} {size}>{size}</Button>
						{/each}
						<Button {variant} disabled>Disabled</Button>
						<Button {variant} loading>Loading</Button>
						<Button {variant} success>Saved</Button>
					</div>
				{/each}
			</div>
		</Panel>

		<div class="grid gap-4 lg:grid-cols-2">
			<Panel label="Forms" title="Inputs, Selects, Toggles">
				<div class="flex flex-col gap-4">
					<Input label="Project name" hint="Standard input with helper text." bind:value={title} />
					<Input label="Invalid value" value="bad/path//" error="Use a valid output name." />

					<div class="grid gap-3 sm:grid-cols-2">
						<Select label="Container" options={containerOptions} bind:value={container} />
						<Select
							label="Disabled"
							options={containerOptions}
							value="epub"
							disabled
							hint="Disabled select state."
						/>
					</div>

					<Toggle label="Checked toggle" hint="Square thumb, rounded track." bind:checked />
					<Toggle label="Disabled toggle" checked={disabledToggle} disabled />
				</div>
			</Panel>

			<Panel label="Data" title="Paths, Progress, Keyboard">
				<div class="flex flex-col gap-4">
					<PathDisplay value="/Users/Luca/Documents/Projekte/Thasia/source/chapter-001.cbz" />
					<PathDisplay empty="No destination selected" />

					<div class="grid gap-3">
						{#each progressVariants as variant, i (variant)}
							<div class="flex items-center gap-3">
								<SectionLabel class="w-20">{variant}</SectionLabel>
								<ProgressBar {variant} value={(i + 1) * 0.22} />
							</div>
						{/each}
						<div class="flex items-center gap-3">
							<SectionLabel class="w-20">custom</SectionLabel>
							<ProgressBar value={0.72} color="linear-gradient(90deg, #22d3ee, #d4af37)" />
						</div>
					</div>

					<div class="flex flex-wrap items-center gap-2">
						<Kbd>Esc</Kbd>
						<KeyComboDisplay combo="meta+keyb" />
						<KeyComboDisplay combo="shift+arrowright" />
					</div>
				</div>
			</Panel>
		</div>

		<div class="grid gap-4 lg:grid-cols-2">
			<Panel label="Surfaces" title="Cards and Rows">
				<div class="grid gap-3">
					<Card>
						<div class="text-sm font-bold">Static Card</div>
						<div class="mt-1 text-xs text-anasthasia-muted">
							Use for content groups inside a section.
						</div>
					</Card>

					<Card onclick={() => (showAdvanced = !showAdvanced)}>
						<div class="flex items-center justify-between gap-4">
							<div>
								<div class="text-sm font-bold">Interactive Card</div>
								<div class="mt-1 text-xs text-anasthasia-muted">
									Click to toggle the collapsible advanced area.
								</div>
							</div>
							<Badge variant="accent">{showAdvanced ? 'open' : 'closed'}</Badge>
						</div>
					</Card>

					{#if showAdvanced}
						<div transition:softCollapse>
							<FieldRow label="Advanced encoding" hint="Conditional regions use softCollapse.">
								<SegmentedControl options={formatOptions} bind:value={format} />
							</FieldRow>
						</div>
					{/if}
				</div>
			</Panel>

			<Panel label="Motion" title="Named Animation Types">
				<div class="flex flex-col gap-3 text-sm text-anasthasia-muted">
					<FieldRow
						label="Pill motion"
						hint="Shared by segmented controls, tabs, nav, and step trackers."
					>
						<Badge variant="accent">sendPill / receivePill</Badge>
					</FieldRow>
					<FieldRow
						label="Rise in"
						hint="Default entrance for panels, alerts, popovers, and step content."
					>
						<Badge variant="accent">riseIn</Badge>
					</FieldRow>
					<FieldRow
						label="Soft collapse"
						hint="Default for conditional form sections and expanding panels."
					>
						<Badge variant="accent">softCollapse</Badge>
					</FieldRow>
					<FieldRow label="Glass collapse" hint="Default for dense key-hint and status chips.">
						<Badge variant="accent">glassCollapse</Badge>
					</FieldRow>
				</div>
			</Panel>
		</div>
	</div>

	<KeyHintBar />
	<ToastProvider />

	<Dialog
		bind:open={dialogOpen}
		title="Confirm Conversion"
		description="Modal copy follows the classless typography defaults."
	>
		<p>
			This dialog is intentionally plain: surface, border, backdrop, focus handling, and shared
			motion are the primitive. Product-specific content stays in the consuming app.
		</p>
		{#snippet footer()}
			<Button variant="ghost" onclick={() => (dialogOpen = false)}>Cancel</Button>
			<Button variant="primary" onclick={() => (dialogOpen = false)}>Continue</Button>
		{/snippet}
	</Dialog>
</main>
