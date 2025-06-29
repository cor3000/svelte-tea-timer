import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-css-porter';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'teatimeApp',
		file: 'public/bundle.js'
	},
	plugins: [
		svelte({
			// we'll extract any component CSS out into
			// a separate file — better for performance
			// css: css => {	css.write('public/bundle.css');	},
			// emit to css plugin below
			emitCss: true,
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
				runes: true
			}
		}),

		css({
			minified: production ? 'public/bundle.css' : false,
			raw: production ? false : 'public/bundle.css'
		}),

		resolve({
			browser: true,
			dedupe: ['svelte'],
			exportConditions: ['svelte']
		}),
		commonjs(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
