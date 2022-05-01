/// <reference types="@sveltejs/kit" />

type User = import('./types').User;

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	interface Locals {
		user: User | null;
	}

	// interface Platform {}

	interface Session {
		user?: User;
	}

	// interface Stuff {}
}
