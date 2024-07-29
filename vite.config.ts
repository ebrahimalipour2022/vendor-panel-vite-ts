import svgr from 'vite-plugin-svgr';
import crypto from 'crypto';
import path from 'path';
import checker from 'vite-plugin-checker';
import { loadEnv, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const PORT = 3000;

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
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        src: path.join(__dirname, 'src'),
      },
    },
    server: { port: PORT, host: true },
    preview: { port: PORT, host: true },
  };
});
