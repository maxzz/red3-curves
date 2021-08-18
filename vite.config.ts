import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import visualizer from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    plugins: [
        reactRefresh(),
        visualizer({
            filename: 'vizualization.html',
            template: 'sunburst', // sunburst - d3 style; treemap - table (default); network - graph (slow to open).
            gzipSize: true,
            brotliSize: true,
        }),
    ]
});
