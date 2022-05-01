<script lang="ts">
	export let type = 'button';
</script>

<button {type} class="button">
	<slot />
</button>

<style lang="scss">
	@use 'src/theme';
	.button {
		background-color: theme.$secondary;
	}
</style>
