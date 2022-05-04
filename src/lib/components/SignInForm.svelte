<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	import { createEventDispatcher } from 'svelte';

	let email = '';
	let password = '';

	const dispatch = createEventDispatcher();

	function submit() {
		dispatch('submit', {
			email,
			password
		});
	}
</script>

<form on:submit|preventDefault={submit} class="form">
	<div class="input-section">
		<Input label="Email" id="email" name="email" type="email" bind:value={email} required />
		<Input
			label="Password"
			id="password"
			name="password"
			type="password"
			bind:value={password}
			required
		/>
	</div>
	<Button type="submit">Sign In</Button>
</form>

<style lang="scss">
	.form {
		@include style.login-form;
	}
	.input-section {
		margin-bottom: style.$spacing * 5;
	}
</style>
