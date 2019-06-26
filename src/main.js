import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		title: '泡茶！'
	}
});

export default app;