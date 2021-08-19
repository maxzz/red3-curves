import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { visualizer } from 'rollup-plugin-visualizer';
import url from '@rollup/plugin-url';
import image from '@rollup/plugin-image';

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    plugins: [
        reactRefresh(),
        // {
        //     ...image(),
        //     //enforce: 'pre',
        // },
        {
            ...url(
                    {
                    include: ['**/*.svg'],
                    limit: 15000,
                }
            ),
            enforce: 'pre',
        },
        visualizer({
            filename: 'vizualization.html',
            template: 'sunburst', // sunburst - d3 style (good as default as well); treemap - table (default); network - graph (slow to open).
            gzipSize: true,
            brotliSize: true,
        }),
    ]
});
