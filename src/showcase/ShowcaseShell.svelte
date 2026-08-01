<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { resolve } from '$app/paths';
	import imperialUrl from '$lib/styles/flavours/imperial.css?url';
	import crimsonUrl from '$lib/styles/flavours/crimson.css?url';
	import spectrumUrl from '$lib/styles/flavours/spectrum.css?url';
	import hypergryphUrl from '$lib/styles/flavours/hypergryph.css?url';
	import { theme } from '$lib/runtime/theme.svelte.js';
	import Badge from '$lib/components/Badge.svelte';
	import Select from '$lib/components/Select.svelte';
	import ToastProvider from '$lib/components/ToastProvider.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import { showcaseCategories, showcaseEntries } from './catalog.js';

	type Flavour = 'imperial' | 'crimson' | 'spectrum' | 'hypergryph';

	let {
		title,
		description,
		activeSlug,
		children
	}: { title: string; description: string; activeSlug?: string; children: Snippet } = $props();

	const flavourUrls: Record<Flavour, string> = {
		imperial: imperialUrl,
		crimson: crimsonUrl,
		spectrum: spectrumUrl,
		hypergryph: hypergryphUrl
	};
	const flavourOptions = [
		{ value: 'imperial', label: 'Imperial' },
		{ value: 'crimson', label: 'Crimson' },
		{ value: 'spectrum', label: 'Spectrum' },
		{ value: 'hypergryph', label: 'Hypergryph' }
	] satisfies Array<{ value: Flavour; label: string }>;

	let flavour = $state<Flavour>('hypergryph');
	let hydrated = $state(false);

	function syncUrl() {
		if (!hydrated) return;
		const url = new URL(window.location.href);
		url.searchParams.set('flavour', flavour);
		url.searchParams.set('mode', theme.isDark ? 'dark' : 'light');
		window.history.replaceState({}, '', url);
	}

	onMount(() => {
		theme.init();
		const params = new URLSearchParams(window.location.search);
		const requestedFlavour = params.get('flavour');
		const requestedMode = params.get('mode');
		if (
			requestedFlavour === 'imperial' ||
			requestedFlavour === 'crimson' ||
			requestedFlavour === 'spectrum' ||
			requestedFlavour === 'hypergryph'
		) {
			flavour = requestedFlavour;
		}
		if (requestedMode === 'light' || requestedMode === 'dark') theme.setMode(requestedMode);
		hydrated = true;
	});
</script>

<!-- URLs include preserved showcase query parameters after resolve(). -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<svelte:head>
	<title>{title} · Anasthasia</title>
	<link rel="stylesheet" href={flavourUrls[flavour]} />
</svelte:head>

<main
	data-hydrated={hydrated}
	class="flex h-dvh flex-col overflow-hidden bg-anasthasia-bg font-anasthasia-sans text-anasthasia-text"
>
	<header
		class="flex shrink-0 items-center justify-between gap-6 border-b border-anasthasia-border bg-anasthasia-surface px-5 py-3"
	>
		<div class="min-w-0">
			<a
				href={`${resolve('/')}?flavour=${flavour}&mode=${theme.isDark ? 'dark' : 'light'}`}
				class="text-base font-bold text-anasthasia-text no-underline hover:opacity-80">Anasthasia</a
			>
			<span class="ml-2 text-xs text-anasthasia-muted">Component laboratory</span>
		</div>
		<div class="flex shrink-0 items-center gap-3">
			<Select
				ariaLabel="Flavour"
				options={flavourOptions}
				bind:value={flavour}
				onchange={() => syncUrl()}
				class="w-32"
			/>
			<Toggle
				aria-label="Dark mode"
				checked={theme.isDark}
				onchange={(dark) => {
					theme.setMode(dark ? 'dark' : 'light');
					syncUrl();
				}}
			/>
			<Badge variant="accent">v0.2.2</Badge>
		</div>
	</header>

	<div class="flex min-h-0 flex-1">
		<aside
			class="hidden w-64 shrink-0 overflow-y-auto border-r border-anasthasia-border bg-anasthasia-panel px-3 py-4 md:block"
		>
			<a
				href={`${resolve('/')}?flavour=${flavour}&mode=${theme.isDark ? 'dark' : 'light'}`}
				class="mb-4 block rounded-anasthasia-md px-3 py-2 text-sm font-medium no-underline {activeSlug
					? 'text-anasthasia-muted hover:bg-anasthasia-surface hover:text-anasthasia-text'
					: 'bg-anasthasia-surface text-anasthasia-accent'}">Overview</a
			>
			{#each showcaseCategories as category (category)}
				<div class="mb-5">
					<div
						class="mb-1 px-3 text-[10px] font-bold tracking-widest text-anasthasia-muted uppercase"
					>
						{category}
					</div>
					<nav aria-label={`${category} components`}>
						{#each showcaseEntries.filter((entry) => entry.category === category) as entry (entry.slug)}
							<a
								href={`${resolve('/components/[slug]', { slug: entry.slug })}?flavour=${flavour}&mode=${theme.isDark ? 'dark' : 'light'}`}
								aria-current={activeSlug === entry.slug ? 'page' : undefined}
								class="flex items-center justify-between rounded-anasthasia-md px-3 py-1.5 text-sm no-underline {activeSlug ===
								entry.slug
									? 'bg-anasthasia-surface font-medium text-anasthasia-accent shadow-sm'
									: 'text-anasthasia-muted hover:bg-anasthasia-surface hover:text-anasthasia-text'}"
							>
								{entry.name}
								<span class="text-[9px] tracking-wider text-anasthasia-muted uppercase"
									>{entry.kind}</span
								>
							</a>
						{/each}
					</nav>
				</div>
			{/each}
		</aside>

		<section class="min-w-0 flex-1 overflow-y-auto">
			<div class="mx-auto max-w-7xl px-5 py-7 lg:px-8">
				<header class="mb-7 border-b border-anasthasia-border pb-5">
					<h1 class="text-2xl font-bold text-anasthasia-text">{title}</h1>
					<p class="mt-1 max-w-3xl text-sm text-anasthasia-muted">{description}</p>
				</header>
				{@render children()}
			</div>
		</section>
	</div>

	<ToastProvider />
</main>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
