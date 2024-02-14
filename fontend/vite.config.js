import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { terser } from "rollup-plugin-terser";
// import { visualizer } from "rollup-plugin-visualizer";
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer() ,
  ],
  optimizeDeps: {
    include: ["million"],
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // ปิดการโชว์ console.log ใน production mode
      },
    },
    rollupOptions: {
      plugins: [terser()],
    },
  },
  server: {
    // คอนฟิก server ตามที่คุณต้องการ
    host: true,
    strictPort: true,
    port: 8088,
  },
  preview: {
    port: 8083,
  },
});



// export default defineConfig({
//   plugins: [
//     react(),
//     visualizer({
//       template: 'treemap', // หรือ 'sunburst'
//       open: true,
//       gzipSize: true,
//       brotliSize: true,
//       filename: 'analyse.html',
//       statsFilename: 'stats.json',
//       generateStatsFile: true,
//       openAnalyzer: false,
//       logLevel: 'error',
//       defaultSizes: 'gzip',
//       bundleDir: 'dist',
//       reportFilename: 'report.html'
//     })
//   ],
//   optimizeDeps: {
//     include: ['million'],
//   },
//   build: {
//     minify: 'terser',
//     terserOptions: {
//       compress: {
//         drop_console: true,
//       },
//     },
//     rollupOptions: {
//       plugins: [terser()],
//     },
//   },
//   server: {
//     host: true,
//     strictPort: true,
//     port: 8088,
//   },
//   preview: {
//     port: 8083,
//   },
// });
