import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import clear from 'rollup-plugin-clear';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [visualizer(), clear({ targets: ['lib'], watch: true }), dts()],
  build: {
    outDir: 'lib',
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: '@fe/calc',
      formats: ['es', 'umd'],
      fileName: 'index'
    }
  }
});
