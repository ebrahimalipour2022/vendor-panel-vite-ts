import svgr from 'vite-plugin-svgr';
import crypto from 'crypto';
import path from 'path';
import checker from 'vite-plugin-checker';
import { loadEnv, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

const PORT = 3030;

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // Function to generate a hash using timestamp
  function generateHashWithTimestamp() {
    // Get the current timestamp
    const timestamp = Date.now().toString();
    // Generate a hash using the timestamp
    return crypto.createHash('sha256').update(timestamp).digest('hex');
  }

  return {
    build: {
      outDir: 'build', // The directory to put built files in (default 'dist')
      rollupOptions: {
        output: {
          entryFileNames: `[name]-${generateHashWithTimestamp()}.js`,
          chunkFileNames: `[name]-${generateHashWithTimestamp()}.js`,
          assetFileNames: `[name]-${generateHashWithTimestamp()}.[ext]`,
        },
      },
    },
    define: {
      'process.env': process.env,
    },
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
        },
        overlay: {
          position: 'tl',
          initialIsOpen: false,
        },
      }),
      svgr({
        include: '**/*.svg?react',
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png', 'maskable-icon-512x512.png'],
        manifest: {
          name: 'ZapVendorPanel',
          short_name: 'وندرو پنل زپ',
          display: 'standalone',
          start_url: '/',
          theme_color: '#000000',
          background_color: '#ffffff',

          icons: [
            {
              src: 'pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png',
            },
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        src: path.join(__dirname, 'src'),
        // "@widgets": path.resolve("src/widgets"),
        // "@features": path.resolve("src/features"),
        // "@entities": path.resolve("src/entities"),
      },
    },
    server: { port: PORT, host: true },
    preview: { port: PORT, host: true },
  };
});
