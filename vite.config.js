import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import commonjs from 'vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    port: 5173,
    plugins: [
        vue()
    ],
    build: {
        outDir: 'guiSrc/dist',
        minify: false,
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./guiSrc', import.meta.url))
        }
    }
})
