<script lang="ts">
	interface Props {
		value?: string | null;
		empty?: string;
		class?: string;
	}

	let { value, empty = 'No value selected', class: className = '' }: Props = $props();
</script>

<div
	class="flex min-h-9 items-center rounded-anasthasia-lg border border-anasthasia-border bg-anasthasia-bg px-3 py-2 font-anasthasia-mono text-xs break-all {value
		? 'text-anasthasia-text'
		: 'text-anasthasia-muted'} {className}"
>
	{value || empty}
</div>
