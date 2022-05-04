<script lang="ts">
	import { goto } from '$app/navigation';
	import SignUpForm from '$lib/components/SignUpForm.svelte';
	import { session } from '$app/stores';
	import type { ServerUser } from 'src/types';

	let error = '';

	async function handleSubmit({ detail: { email, passwordHash } }: { detail: ServerUser }) {
		const response = await fetch('/api/sign-up', {
			method: 'POST',
			body: JSON.stringify({ email, passwordHash }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const body = await response.json();
		if (response.ok) {
			// session from getSession hook will otherwise not be set before navigation
			// that would trigger redirect from /app back to /sign-in
			$session = body;
			await goto('/app');
		}
		error = body.message;
	}
</script>

<h1 class="title">Sign Up</h1>
{#if error}
	<p>{error}</p>
{/if}
<SignUpForm on:submit={handleSubmit} />

<style lang="scss">
	.title {
		text-align: center;
	}
</style>
