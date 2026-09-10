# react-todo

## 概要

React を身につけることを目的とした学習プロジェクト
動く TODO アプリはその副産物

前提プロジェクト: [ts-tetris](https://github.com/yamam-9v/ts-tetris)(TypeScript学習プロジェクト・全17ステップ完了済み)

## 技術スタック(予定)

[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white)](https://zod.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black)](https://prettier.io/)

- TypeScript(`strict: true` + `noUncheckedIndexedAccess`。ts-tetris の設定を引き継ぐ)
- React(関数コンポーネント + Hooks のみ)
- Vite(`react-ts` テンプレート)
- json-server(ローカルの疑似REST API)
- Zod(境界データの検証)
- Vitest + React Testing Library
- ESLint(Flat Config)/ Prettier

## セットアップ

```bash
npm create vite@latest react-todo -- --template react-ts
cd react-todo
npm install
npm run dev
```

現時点ではまだ環境構築前(学習計画書のステップ1着手前)。

## 学習プロセスについて

- 学習には Claude Code の Output Style を `Learning` にした上で活用している
- このスタイルでは状態設計・型定義・ロジックは自分で実装し、Claudeはレビュー・解説に徹する
- まずは自分で考え、分からないところは聞き、公式ドキュメントも読みながら概念を理解しながら進める

- 詳細な方針・スコープ・設計方針: [`learning-plan.md`](./learning-plan.md)
- 進捗ログ・現在の状態: [`work-log.md`](./work-log.md)
