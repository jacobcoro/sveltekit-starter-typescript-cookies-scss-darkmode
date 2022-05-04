<!-- sveltekit modules run serverside before page load -->
<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		if (!session?.user) {
			return {
				status: 302,
				redirect: '/sign-in'
			};
		}
		return {
			props: {
				user: session.user
			}
		};
	};
</script>

<script lang="ts">
	import type { User } from 'src/types';
	export let user: User;

	// import { session } from '$app/stores';
	// $session.user;
</script>

<h1 class="">Hi! You are registered with email {user.email}.</h1>
