<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	import { createEventDispatcher } from 'svelte';

	let email = '';
	let password = '';
	let confirmPassword = '';
	let error = '';
	let confirmPasswordInputRef: HTMLElement;

	const dispatch = createEventDispatcher();

	function submit() {
		error = '';
		if (password !== confirmPassword) {
			error = 'Passwords do not match.';
			confirmPasswordInputRef.focus();
			return;
		}

		dispatch('submit', {
			email,
			password
		});
	}
</script>

<form on:submit|preventDefault={submit} class="form">
	<Input label="Email" id="email" name="email" type="email" bind:value={email} />
	<Input label="Password" id="password" name="password" type="password" bind:value={password} />
	<Input
		label="Confirm Password"
		id="confirm-password"
		name="confirm-password"
		type="password"
		bind:value={confirmPassword}
		bind:inputRef={confirmPasswordInputRef}
	/>
	{#if error !== ''}
		<p class="error">{error}</p>
	{/if}
	<div class="button-wrap">
		<Button type="submit">Sign Up</Button>
	</div>
</form>

<style lang="scss">
	.form {
		@include style.login-form;
	}
	.button-wrap {
		margin-top: style.$spacing * 5;
	}
</style>
