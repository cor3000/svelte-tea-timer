<script>
	import Brew from './Brew.svelte';
	export let title;
	let brewTimes = [80, 40, 50, 60, 80, 100];
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>{title}</h1>
<div>
	{#each brewTimes as duration}
		<Brew {duration}/>
	{/each}
</div>
