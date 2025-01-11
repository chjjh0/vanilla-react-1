import { defineConfig } from "vite";
import path from "path";
import babel from "vite-plugin-babel";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsx: "preserve", // JSX를 그대로 유지하여 Babel에서 처리하게 함
  },
  plugins: [
    babel({
      babelConfig: {
        plugins: [
          [
            "@babel/plugin-transform-react-jsx",
            {
              pragma: "h",
              pragmaFrag: "Fragment", // 프래그먼트 처리를 위한 옵션
              runtime: "classic", // 명시적으로 클래식 런타임 설정
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // @를 src 디렉토리에 매핑
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
