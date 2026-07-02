<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLButtonAttributes, 'onchange'> {
		checked: boolean;
		onchange?: (checked: boolean) => void;
		label?: string;
		hint?: string;
	}

	let {
		checked = $bindable(),
		onchange,
		disabled = false,
		label,
		hint,
		class: className = '',
		...rest
	}: Props = $props();

	function toggle() {
		if (disabled) return;
		checked = !checked;
		onchange?.(checked);
	}
</script>

<button
	type="button"
	role="switch"
	aria-checked={checked}
	{disabled}
	onclick={toggle}
	class="group inline-flex cursor-pointer items-center gap-2.5 select-none focus-visible:ring-2 focus-visible:ring-anasthasia-accent focus-visible:ring-offset-2 focus-visible:ring-offset-anasthasia-surface focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 {className}"
	{...rest}
>
	<span
		aria-hidden="true"
		class="relative inline-flex h-5 w-9 shrink-0 items-center rounded-anasthasia-md border transition-colors duration-200 {checked
			? 'border-anasthasia-accent bg-anasthasia-accent'
			: 'border-anasthasia-border bg-anasthasia-bg group-hover:border-anasthasia-accent/40'}"
	>
		<span
			class="absolute h-3.5 w-3.5 rounded-anasthasia-sm border shadow-sm transition-transform duration-200 {checked
				? 'translate-x-[18px] border-transparent bg-anasthasia-on-accent'
				: 'translate-x-0.5 border-anasthasia-border bg-anasthasia-muted'}"
		></span>
	</span>
	{#if label || hint}
		<span class="flex flex-col text-left">
			{#if label}<span class="text-sm text-anasthasia-text">{label}</span>{/if}
			{#if hint}<span class="text-xs text-anasthasia-muted">{hint}</span>{/if}
		</span>
	{/if}
</button>
