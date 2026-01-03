import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte()],
	build: {
		outDir: 'dist',
		sourcemap: true,
		rollupOptions: {
			output: {
				entryFileNames: 'bundle.js',
				chunkFileNames: 'assets/chunk-[name].js',
				assetFileNames: (assetInfo) => {
					if (assetInfo.name && assetInfo.name.endsWith('.css')) {
						return 'bundle.css';
					}
					return 'assets/[name][extname]';
				}
			}
		}
	}
});
