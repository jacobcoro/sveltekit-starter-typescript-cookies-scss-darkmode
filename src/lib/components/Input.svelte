<script lang="ts">
	export let value = '';
	export let id = 'email';
	export let label = '';
	export let type = 'text';
	export let name = '';
	export let required = false;

	export let inputRef: HTMLElement | null = null;

	function setType(node: any) {
		node.type = type;
	}
</script>

<div class={$$props.class}>
	<label for={id} class="input__label">
		{label}
	</label>
	<div class="input__wrapper">
		<input
			use:setType
			{name}
			{id}
			{required}
			bind:value
			bind:this={inputRef}
			class="input__input"
		/>
	</div>
</div>

<style lang="scss">
	input {
		@include style.input;
	}
	.input__label {
		color: var(--grey-med);
	}
	.input__wrapper {
		margin: style.$spacing * 1;
	}
</style>
