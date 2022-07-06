import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  const env = loadEnv("es2020", process.cwd(), ""); // "" => get all variables
  return {
    // Vite 설정
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    plugins: [react()],
    server: {
      port: 3801,
    },
  };
});
