# 作業ログ

`learning-plan.md` に基づく進捗記録。セッションの節目や作業終了時に追記していく。

## 記録ルール

- 新しいエントリは**ファイル末尾に追記**する(上書きしない)
- 1エントリ = 1セッション(または区切りの良い作業単位)
- 日付は絶対日付で記載する
- 「新しく理解したReactの概念」が一言で言えないステップは、計画書 8 節に従い未完了扱いとする

## エントリ テンプレート

```
## YYYY-MM-DD

- マイルストーン / ステップ: #
- やったこと:
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来):
- 新しく理解したReactの概念:
- 次回やること:
```

---

## 進捗サマリー(最新状態を上書きで更新)

| マイルストーン | ステップ | 状態 |
|---|---|---|
| 第0: 足場を作る | 1. Vite(react-ts)環境構築 + ts-tetris設定移植 | 未着手 |
| 第0 | 2. eslint-plugin-react-hooks導入 + パラダイムの違いの言語化 | 未着手 |
| 第1: fetchなしのReact基礎 | 3. useStateとpropsでハードコード配列を表示 | 未着手 |
| 第1 | 4. 追加・削除・完了トグル(状態の不変更新) | 未着手 |
| 第1 | 5. コンポーネント分割 | 未着手 |
| 第1 | 6. useEffect初体験 — localStorage永続化 | 未着手 |
| 第2: 通信とバリデーション | 7. json-server導入 + TodoRepositoryインターフェース設計 | 未着手 |
| 第2 | 8. fetchによるCRUDと3状態の判別可能ユニオン | 未着手 |
| 第2 | 9. Zod導入 + 型定義(.d.ts)を読む | 未着手 |
| 第2 | 10. Vitest + React Testing Library(最小限) | 未着手 |
| 第3: 外部APIとCORS | 11. Nager.Dateから祝日を取得して表示に反映 | 未着手 |
| 第3 | 12. CORSに当たる → Viteのproxyで回避 | 未着手 |
| 第4: 公開と自宅サーバ | 13. GitHub Pagesへデプロイ(デモ用ビルド) | 未着手 |
| 第4 | 14. Docker Compose + nginxで自宅サーバに載せる | 未着手 |
| 第4 | 15. tailscale serveで安全に公開 | 未着手 |
| 第4 | 16. README整備 | 未着手 |

---

## 現在の状態(最新状態を上書きで更新)

プロジェクト未着手。`learning-plan.md` と `work-log.md` を作成した段階。
次のアクションはステップ1(Vite `react-ts` テンプレートでの環境構築、および `ts-tetris` の
`tsconfig.json` / ESLint / Prettier 設定の移植)。

作業拠点は `~/projects/react-todo`(WSL2ネイティブファイルシステム)。

---

## ログ本体

## 2026-09-10

- マイルストーン / ステップ: (準備段階、ステップ1着手前)
- やったこと: プロジェクトディレクトリ `~/projects/react-todo` を作成。`learning-plan.md`(React学習プロジェクト指示書)と `work-log.md` を、`ts-tetris` の運用形式を参考に作成。
- 詰まった点: なし
- 新しく理解したReactの概念: (該当なし。まだ着手前)
- 次回やること: ステップ1(Vite react-ts 環境構築 + ts-tetris の tsconfig/ESLint/Prettier 設定の移植)に着手する。
