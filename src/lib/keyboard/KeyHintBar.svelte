<script lang="ts">
	import { keyHint } from './keyhint.svelte.js';
	import { glassCollapse } from '../transitions.js';
	import KeyComboDisplay from './KeyComboDisplay.svelte';

	let {
		visible = true,
		ariaLabel = 'Keyboard shortcuts',
		class: className = ''
	}: { visible?: boolean; ariaLabel?: string; class?: string } = $props();
	let hints = $derived(keyHint.get());
</script>

{#if visible && hints.length > 0}
	<div
		role="navigation"
		aria-label={ariaLabel}
		class="flex h-8 flex-shrink-0 items-center overflow-hidden border-t border-anasthasia-border bg-anasthasia-surface px-4 {className}"
	>
		{#each hints as [combo, label] (combo)}
			<div class="mr-5 flex items-center gap-2" transition:glassCollapse>
				<KeyComboDisplay {combo} />
				<span class="text-xs whitespace-nowrap text-anasthasia-muted">{label}</span>
			</div>
		{/each}
	</div>
{/if}
