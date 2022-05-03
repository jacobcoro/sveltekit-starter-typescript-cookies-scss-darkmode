<script lang="ts">
	export let type = 'button';
</script>

<button {type} class="button">
	<slot />
</button>

<style lang="scss">
	.button {
		@include style.button;
	}
</style>
