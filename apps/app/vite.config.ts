import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
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
    define: {
      // Add process.env definitions
      "process.env": {
        ...env,
        NODE_ENV: JSON.stringify(mode),
      },
    },
    server: {
      port: 3030,
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
        "@transak/react-native-sdk",
      ],
    },
  };
});
