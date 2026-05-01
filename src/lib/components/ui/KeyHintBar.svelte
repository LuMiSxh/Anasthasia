<script lang="ts">
	import { keyHint } from '../../stores/keyhint.svelte.js';
	import { uiPrefs } from '../../stores/ui-prefs.svelte.js';
	import { glassCollapse } from '../../transitions.js';
	import KeyComboDisplay from './KeyComboDisplay.svelte';

	let hints = $derived(keyHint.get());
</script>

{#if uiPrefs.showKeyHints && hints.length > 0}
	<div
		class="flex h-8 flex-shrink-0 items-center overflow-hidden border-t border-anasthasia-border bg-anasthasia-surface px-4"
	>
		{#each hints as [combo, label] (combo)}
			<div class="mr-5 flex items-center gap-2" transition:glassCollapse>
				<KeyComboDisplay {combo} />
				<span class="text-xs whitespace-nowrap text-anasthasia-muted">{label}</span>
			</div>
		{/each}
	</div>
{/if}
