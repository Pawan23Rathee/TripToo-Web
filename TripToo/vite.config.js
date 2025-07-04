// vite.config.js - MIXED CODE FOR REACT, PROXY, AND TAILWIND CSS

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // For React JSX processing
import tailwindcss from '@tailwindcss/vite'; // <--- Keeping this as per your project's reliance on it

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Crucial for React JSX
    tailwindcss(), // <--- Keeping this for your design to work
  ],
  server: { // This entire 'server' block is for the API proxy
    proxy: {
      '/api': { // When your frontend requests /api/...
        target: 'http://localhost:5000', // ...Vite redirects it to your backend
        changeOrigin: true, // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes the /api prefix
      },
    },
  },
});