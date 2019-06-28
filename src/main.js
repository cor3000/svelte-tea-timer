import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		title: 'It\'s Tea Time!'
	}
});

export default app;