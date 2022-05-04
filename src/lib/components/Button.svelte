<script lang="ts">
	export let type = 'button';
</script>

<button {type}><slot /></button>

<style lang="scss">
	button {
		@include style.button;
	}
</style>
