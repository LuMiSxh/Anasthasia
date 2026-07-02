<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		columns,
		rows,
		cornerLabel = 'State',
		children
	}: {
		columns: string[];
		rows: string[];
		cornerLabel?: string;
		children: Snippet<[string, string]>;
	} = $props();
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex (scrollable matrices need keyboard access) -->
<div
	role="region"
	aria-label={`${cornerLabel} property matrix`}
	tabindex="0"
	class="overflow-x-auto rounded-anasthasia-xl border border-anasthasia-border bg-anasthasia-surface focus-visible:ring-2 focus-visible:ring-anasthasia-accent focus-visible:outline-none"
>
	<table class="w-full min-w-max border-collapse text-left">
		<thead>
			<tr class="bg-anasthasia-panel">
				<th
					class="border-b border-anasthasia-border px-4 py-2.5 text-xs font-bold tracking-wider text-anasthasia-muted uppercase"
					>{cornerLabel}</th
				>
				{#each columns as column (column)}
					<th
						class="border-b border-l border-anasthasia-border px-4 py-2.5 text-xs font-bold tracking-wider text-anasthasia-muted uppercase"
						>{column}</th
					>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row (row)}
				<tr>
					<th
						class="border-b border-anasthasia-border bg-anasthasia-panel/60 px-4 py-4 text-sm font-medium text-anasthasia-text last:border-b-0"
						>{row}</th
					>
					{#each columns as column (column)}
						<td
							class="min-w-44 border-b border-l border-anasthasia-border px-4 py-4 align-middle last:border-b-0"
						>
							{@render children(row, column)}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
