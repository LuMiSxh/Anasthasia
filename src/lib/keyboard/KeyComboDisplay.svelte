<script lang="ts">
	import { onMount } from 'svelte';
	import type { Platform } from '../types.js';
	import Kbd from './Kbd.svelte';

	let {
		combo,
		platform,
		class: className = ''
	}: { combo: string; platform?: Platform; class?: string } = $props();
	let detectedPlatform = $state<Platform>('linux');

	onMount(() => {
		if (platform) return;
		const value = navigator.userAgent.toLowerCase();
		detectedPlatform = value.includes('mac') ? 'mac' : value.includes('win') ? 'windows' : 'linux';
	});

	const macSymbols: Record<string, string> = {
		meta: '⌘',
		alt: '⌥',
		ctrl: '⌃',
		shift: '⇧',
		arrowright: '→',
		arrowleft: '←',
		arrowup: '↑',
		arrowdown: '↓',
		enter: '↩',
		escape: 'Esc',
		backspace: '⌫',
		tab: '⇥',
		space: '␣'
	};
	const otherSymbols: Record<string, string> = {
		meta: 'Win',
		alt: 'Alt',
		ctrl: 'Ctrl',
		shift: '⇧',
		arrowright: '→',
		arrowleft: '←',
		arrowup: '↑',
		arrowdown: '↓',
		enter: '↵',
		escape: 'Esc',
		backspace: '⌫',
		tab: '⇥',
		space: '␣'
	};

	function formatPart(part: string, target: Platform): string {
		const symbols = target === 'mac' ? macSymbols : otherSymbols;
		if (symbols[part]) return symbols[part];
		if (part.startsWith('key')) return part.slice(3).toUpperCase();
		if (part.startsWith('digit')) return part.slice(5);
		return part.toUpperCase();
	}

	let parts = $derived(
		combo
			.toLowerCase()
			.split('+')
			.map((part) => formatPart(part, platform ?? detectedPlatform))
	);
</script>

<span class="inline-flex items-center gap-0.5 {className}" aria-label={combo}>
	{#each parts as part, i (i)}<Kbd>{part}</Kbd>{/each}
</span>
