<script lang="ts">
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import { sunO, moonO } from 'svelte-awesome/icons';
	import Icon from 'svelte-awesome';
	import UseTheme from '../helpers/UseTheme.svelte';
	import { onMount } from 'svelte';
	const navigation = [
		{
			href: '/',
			name: 'Home'
		},
		{
			href: '/app',
			name: `App`
		}
	];

	async function handleSignOut() {
		await fetch('/api/sign-out');
		$session = {};
		await goto('/sign-in');
	}
</script>

<header class="navigation">
	<nav>
		<div class="nav__items">
			<UseTheme let:toggleTheme let:theme>
				<button on:click={toggleTheme} class="theme-toggle">
					{#if theme === 'dark'}
						<Icon scale={1.2} data={sunO} />
					{:else}
						<Icon scale={1.2} data={moonO} />
					{/if}
				</button>
			</UseTheme>

			{#each navigation as link}
				<a href={link.href}>
					{link.name}
				</a>
			{/each}

			{#if $session.user}
				<button on:click={handleSignOut}> Sign out </button>
			{:else}
				<a href="/sign-in"> Sign in </a>
				<a href="/sign-up"> Sign up </a>
			{/if}
		</div>
	</nav>
</header>

<style lang="scss">
	.navigation {
		background-color: var(--secondary);
		padding: style.$spacing * 1;
	}

	a,
	button {
		color: white;
		text-decoration: none;
	}
	.nav__items {
		display: flex;
		justify-content: space-around;
	}
	.theme-toggle {
		display: flex;
		align-items: center;
	}
</style>
