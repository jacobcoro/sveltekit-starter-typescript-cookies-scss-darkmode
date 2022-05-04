<script lang="ts">
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import { sunO, moonO } from 'svelte-awesome/icons';
	import Icon from 'svelte-awesome';
	import { useDarkMode } from './useDarkMode';
	const navigation = [
		{
			href: '/',
			name: 'Home'
		},
		{
			href: '/protected',
			name: `${$session.user ? '🔓' : '🔒'} Protected`
		}
	];
	const { toggleTheme, theme } = useDarkMode();
	console.log({ theme });

	async function handleSignOut() {
		await fetch('/api/sign-out');
		$session = {};
		await goto('/sign-in');
	}
</script>

<header class="navigation">
	<nav>
		<div class="nav__items">
			<button on:click={toggleTheme} class="theme-toggle">
				{#if theme === 'dark'}
					<Icon data={sunO} />
				{:else}
					<Icon data={moonO} />
				{/if}
			</button>

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
	a {
		text-decoration: none;
	}
	.nav__items {
		display: flex;
		justify-content: space-around;
	}
	.theme-toggle {
		display: flex;
		align-items: center;
		color: var(--text);
	}
</style>
