<script lang="ts">
	import ComponentPage from '../../../showcase/ComponentPage.svelte';
	import ShowcaseShell from '../../../showcase/ShowcaseShell.svelte';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();
</script>

<ShowcaseShell
	title={data.entry.name}
	description={data.entry.description}
	activeSlug={data.entry.slug}
>
	<ComponentPage entry={data.entry} />
</ShowcaseShell>
