<script lang="ts">
	interface Props {
		value?: number; // 0–1; omit for indeterminate progress
		variant?: import('../types.js').ProgressVariant;
		color?: string; // custom CSS color — overrides variant
		class?: string;
		label: string;
		valueText?: string;
	}

	let {
		value,
		variant = 'accent',
		color = '',
		class: className = '',
		label,
		valueText
	}: Props = $props();

	const trackColors: Record<string, string> = {
		accent: 'bg-anasthasia-accent',
		success: 'bg-anasthasia-success',
		warning: 'bg-anasthasia-warning',
		danger: 'bg-anasthasia-danger'
	};

	let pct = $derived(value === undefined ? undefined : Math.min(Math.max(value * 100, 0), 100));
</script>

<div
	role="progressbar"
	aria-label={label}
	aria-valuemin="0"
	aria-valuemax="100"
	aria-valuenow={pct === undefined ? undefined : Math.round(pct)}
	aria-valuetext={valueText}
	class="h-1.5 w-full overflow-hidden rounded-full border border-anasthasia-border bg-anasthasia-bg {className}"
>
	<div
		class="h-full rounded-full transition-[width] duration-200 {pct === undefined
			? 'anasthasia-progress-indeterminate w-1/3'
			: ''} {color ? '' : trackColors[variant]}"
		style={pct === undefined
			? `background: ${color || ''}`
			: `width: ${pct}%;${color ? ` background: ${color}` : ''}`}
	></div>
</div>

<style>
	.anasthasia-progress-indeterminate {
		animation: indeterminate 1.2s ease-in-out infinite;
	}
	@keyframes indeterminate {
		0% {
			transform: translateX(-110%);
		}
		100% {
			transform: translateX(310%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.anasthasia-progress-indeterminate {
			animation: none;
			transform: translateX(100%);
		}
	}
</style>
