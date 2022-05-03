<script lang="ts">
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import { sunO, moonO } from 'svelte-awesome/icons';
	import Icon from 'svelte-awesome';
	import { onMount } from 'svelte';
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
	let theme = '';
	onMount(() => {
		const root = document.getElementById('app-root');
		theme = root?.dataset.theme ?? 'light';
		console.log({ theme, root });
	});
	const handleThemeChange = () => {
		const root = document.getElementById('app-root');
		console.log({ theme, root });

		if (!root) return;
		theme = root?.dataset.theme ?? 'light';
		root.dataset.theme = theme === 'dark' ? 'light' : 'dark';
	};

	async function handleSignOut() {
		await fetch('/api/sign-out');
		$session = {};
		await goto('/sign-in');
	}
</script>

<header class="navigation">
	<nav>
		<div class="nav__items">
			<button on:click={handleThemeChange} class="theme-toggle">
				<Icon data={sunO} />
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
		color: var(--text);
	}
</style>
