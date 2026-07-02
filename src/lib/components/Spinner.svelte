<script lang="ts">
	import type { ControlSize, SpinnerVariant } from '../types.js';

	let {
		label = 'Loading',
		size = 'md',
		variant = 'accent',
		class: className = ''
	}: { label?: string; size?: ControlSize; variant?: SpinnerVariant; class?: string } = $props();
	const sizes: Record<ControlSize, string> = { sm: 'h-3.5 w-3.5', md: 'h-5 w-5', lg: 'h-7 w-7' };
	const colors: Record<SpinnerVariant, string> = {
		accent: 'border-t-anasthasia-accent',
		success: 'border-t-anasthasia-success',
		warning: 'border-t-anasthasia-warning',
		danger: 'border-t-anasthasia-danger'
	};
</script>

<span
	role="status"
	aria-label={label}
	class="inline-block animate-spin rounded-full border-2 border-anasthasia-border motion-reduce:animate-none {sizes[
		size
	]} {colors[variant]} {className}"
></span>
