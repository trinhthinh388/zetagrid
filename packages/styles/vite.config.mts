/// <reference types='vitest' />
import { defineConfig } from 'vite';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/packages/styles',
  plugins: [nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  build: {
    outDir: '../../dist/packages/styles',
    emptyOutDir: true,
    reportCompressedSize: true,
    rollupOptions: {
      input: path.join(import.meta.dirname, 'src/index.scss'),
      output: {
        assetFileNames: '[name][extname]',
      },
    },
  },
}));
