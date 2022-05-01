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
		color: theme.$white;
		border: none;
		padding: theme.$spacing * 1px;
		padding-left: theme.$spacing * 2px;
		padding-right: theme.$spacing * 2px;
	}
</style>
