<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		label?: string;
		hint?: string;
		error?: string;
		class?: string;
	}

	let {
		label,
		hint,
		error,
		id: suppliedId,
		class: className = '',
		value = $bindable(),
		...rest
	}: Props = $props();

	const uid = $props.id();
	const generatedId = `anasthasia-input-${uid}`;
	let id = $derived(suppliedId ?? generatedId);
	let messageId = $derived(`${id}-message`);
</script>

<div class="flex flex-col gap-1.5 {className}">
	{#if label}
		<label class="anasthasia-label" for={id}>{label}</label>
	{/if}
	<input
		{id}
		bind:value
		aria-invalid={error ? 'true' : undefined}
		aria-describedby={error || hint ? messageId : undefined}
		class="w-full rounded-anasthasia-lg border border-anasthasia-border bg-anasthasia-bg px-3 py-1.5 font-anasthasia-sans text-sm text-anasthasia-text transition-colors duration-150 outline-none placeholder:text-anasthasia-muted hover:border-anasthasia-accent/40 focus:border-anasthasia-accent focus:ring-1 focus:ring-anasthasia-accent disabled:opacity-40 {error
			? 'border-anasthasia-danger-border bg-anasthasia-danger-surface'
			: ''}"
		{...rest}
	/>
	{#if error}
		<span id={messageId} class="text-xs text-anasthasia-danger">{error}</span>
	{:else if hint}
		<span id={messageId} class="anasthasia-caption">{hint}</span>
	{/if}
</div>
