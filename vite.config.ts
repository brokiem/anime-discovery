import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/anime-discovery/",
  plugins: [vue(), basicSsl(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    manifest: {
      name: 'Anime Discovery',
      short_name: 'Anime Discovery',
      description: 'Discover your favorite anime with brokiem\'s Anime Discovery',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'android-chrome-384x384.png',
          sizes: '384x384',
          type: 'image/png'
        }
      ]
    }
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
