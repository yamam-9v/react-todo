/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // GitHub Pages は https://<user>.github.io/react-todo/ で配信されるため、
  // デモ用ビルド(npm run build:demo)では JS/CSS の読み込みパスに /react-todo/ を付ける
  base: mode === "demo" ? "/react-todo/" : "/",
  server: {
    proxy: {
      // /api/cao/... へのリクエストを Vite 開発サーバが内閣府へ代理で取りに行く
      // 例: /api/cao/chosei/shukujitsu/syukujitsu.csv
      //   → https://www8.cao.go.jp/chosei/shukujitsu/syukujitsu.csv
      "/api/cao": {
        target: "https://www8.cao.go.jp",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cao/, ""),
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
  },
}));
