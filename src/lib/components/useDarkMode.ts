import { onMount } from 'svelte';

export const useDarkMode = () => {
	// This code assumes a Light Mode default (set data-theme="light" on index.html)

	let theme = '';

	// find initial theme
	onMount(() => {
		theme = 'light';
		if (
			/* This condition checks whether the user has set a site preference for dark mode OR a OS-level preference for Dark Mode AND no site preference */
			localStorage.getItem('color-mode') === 'dark' ||
			(window.matchMedia('(prefers-color-scheme: dark)').matches &&
				!localStorage.getItem('color-mode'))
		) {
			// if true, set the site to Dark Mode
			setTheme('dark');
		}
	});

	const setTheme = (newTheme: 'light' | 'dark') => {
		const root = document.getElementById('app-root');
		if (!root) return;

		localStorage.setItem('color-mode', newTheme);
		theme = newTheme;
		if (root.dataset.theme === newTheme) return;
		root.dataset.theme = newTheme;
	};

	const toggleTheme = () => {
		const root = document.getElementById('app-root');
		if (!root) return;
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return { theme, toggleTheme };
};
