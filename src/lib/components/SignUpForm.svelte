<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	import { createEventDispatcher } from 'svelte';
	import type { ServerUser } from 'src/types';
	import { hash } from '$lib/helpers/crypto';

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

		const user: ServerUser = {
			email,
			passwordHash: hash(password)
		};
		dispatch('submit', user);
	}
</script>

<form on:submit|preventDefault={submit} class="form">
	<div class="input-section">
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
	</div>
	<Button type="submit">Sign Up</Button>
</form>

<style lang="scss">
	.error {
		color: red;
	}
	.form {
		@include style.login-form;
	}
	.input-section {
		margin-bottom: style.$spacing * 5;
	}
</style>
