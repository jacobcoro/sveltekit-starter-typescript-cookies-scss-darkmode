<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<div id="main">
	<Navigation />

	<slot />
</div>

<style lang="scss" global>
	@import 'src/style/reset';
	@import 'src/style/color-theme';

	#main {
		background-color: var(--bg);
		height: 100%;
		width: 100%;
		position: fixed;
	}
</style>
