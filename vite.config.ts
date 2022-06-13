import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  // 현재 작업 디렉터리의 `mode`를 기반으로 env 파일을 불러옴
  // 세 번째 매개변수를 ''로 설정하면 `VITE_` 접두사에 관계없이 모든 환경 변수를 불러옴
  const env = loadEnv("es2020", process.cwd(), "");
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

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3801,
//   },
// });
