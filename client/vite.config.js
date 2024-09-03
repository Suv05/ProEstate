import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:3000",
        secure: false,
      },
      "/google-image": {
        target: "https://lh3.googleusercontent.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/google-image/, ""),
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Real Estate App",
        short_name: "ProEstate",
        description: "A modern real estate app with offline capabilities",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/Home.png", // Assuming Home.png is in the public directory
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "https://media.istockphoto.com/id/1269776313/photo/suburban-house.webp?a=1&b=1&s=612x612&w=0&k=20&c=2aCYwO-u41uuBubb5KQ48GbCpJkDowSL7SlvLgzjknQ=",
            sizes: "512x512",
            type: "image/webp", // Changed to the correct type for a webp file
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            // This pattern will match all API requests to your backend
            urlPattern:
              /^https?:\/\/(localhost:3000|proestate\.onrender\.com)\/api\/v1\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // 1 day
              },
            },
          },
        ],
      },
    }),
  ],
});
