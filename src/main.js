import './css/normalize.css';
import './css/global.css';
import './sw-register.js';
import App from './App.svelte';
import { mount } from 'svelte';

const app = mount(App, {
	target: document.getElementById('app'),
	props: {
		title: 'It\'s Tea Time!'
	}
});

export default app;
