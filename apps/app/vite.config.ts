import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@/assets": path.resolve(__dirname, "./assets"),
      "@/components": path.resolve(__dirname, "./components"),
      "react-native": "react-native-web",
      router: "react-router-dom",
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  optimizeDeps: {
    include: ["react-native-web", "react-router-dom"],
    exclude: [
      "expo-linear-gradient",
      "expo-router",
      "expo-image",
      "react-native-safe-area-context",
    ],
  },
});
