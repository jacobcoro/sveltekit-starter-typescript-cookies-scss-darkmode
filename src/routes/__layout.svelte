<script lang="ts">
	import '../style/reset.css';
	import '../style/color-theme.css';
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<div class="main">
	<Navigation />
	<div class="container">
		<slot />
	</div>
</div>

<style lang="scss">
	.container {
		@include style.container;
	}
	.main {
		background-color: var(--bg);
		height: 100%;
		width: 100%;
		position: fixed;
	}
</style>
