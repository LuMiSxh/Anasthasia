<script lang="ts">
	import ShowcaseShell from '../showcase/ShowcaseShell.svelte';
	import { showcaseCategories, showcaseEntries } from '../showcase/catalog.js';
	import { resolve } from '$app/paths';
</script>

<ShowcaseShell
	title="Component laboratory"
	description="A systematic view of every public component. Matrix pages cover combinable props; custom pages exercise focus, portals, timers, and composition."
>
	<div class="grid gap-6">
		{#each showcaseCategories as category (category)}
			<section>
				<h2 class="mb-3 text-sm font-bold text-anasthasia-text">{category}</h2>
				<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
					{#each showcaseEntries.filter((entry) => entry.category === category) as entry (entry.slug)}
						<a
							href={resolve('/components/[slug]', { slug: entry.slug })}
							class="group rounded-anasthasia-xl border border-anasthasia-border bg-anasthasia-surface p-4 text-anasthasia-text no-underline transition-colors hover:border-anasthasia-accent/50 hover:opacity-100"
						>
							<div class="flex items-center justify-between gap-3">
								<h3 class="font-bold">{entry.name}</h3>
								<span
									class="rounded-full border border-anasthasia-border px-2 py-0.5 text-[9px] font-bold tracking-wider text-anasthasia-muted uppercase"
									>{entry.kind}</span
								>
							</div>
							<p class="mt-2 text-sm text-anasthasia-muted">{entry.description}</p>
						</a>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</ShowcaseShell>
