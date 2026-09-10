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
| 第0: 足場を作る | 1. Vite(react-ts)環境構築 + ts-tetris設定移植 | 完了 |
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

リポジトリの下地(`git init` / `.gitignore` / `README.md` / `CLAUDE.md` / work-log更新をブロックするhook)に加え、
ステップ1(Vite `react-ts` 環境構築)が完了。`npm run dev` / `typecheck` / `lint` / `format` すべて動作確認済み。
`tsconfig.app.json` / `tsconfig.node.json` の両方に `strict: true` と `noUncheckedIndexedAccess: true` を追加済み(ts-tetris の設定を移植)。
ESLintはFlat Configで `typescript-eslint` の `recommendedTypeChecked` + `eslint-plugin-react-hooks`(`react-hooks/exhaustive-deps` 有効)+ `eslint-plugin-react-refresh` + `eslint-config-prettier` を導入。
Vite最新テンプレートのデフォルトlinterがoxlintに変わっていたが、学習計画書の方針(ESLint + eslint-plugin-react-hooks)を優先しユーザーと相談の上ESLintを採用した。

作業拠点は `~/projects/react-todo`(WSL2ネイティブファイルシステム)。
次のアクションはステップ2(`eslint-plugin-react-hooks` は導入済みのため、パラダイムの違いの言語化が中心)。

---

## ログ本体

## 2026-09-10

- マイルストーン / ステップ: (準備段階、ステップ1着手前)
- やったこと: プロジェクトディレクトリ `~/projects/react-todo` を作成。`learning-plan.md`(React学習プロジェクト指示書)と `work-log.md` を、`ts-tetris` の運用形式を参考に作成。
- 詰まった点: なし
- 新しく理解したReactの概念: (該当なし。まだ着手前)
- 次回やること: ステップ1(Vite react-ts 環境構築 + ts-tetris の tsconfig/ESLint/Prettier 設定の移植)に着手する。

## 2026-09-10 (2)

- マイルストーン / ステップ: (準備段階、ステップ1着手前)
- やったこと:
  - `git init` して `main` ブランチでファーストコミット(`.gitignore` / `CLAUDE.md` / `README.md` / `learning-plan.md` / `work-log.md`)を実施。
  - `.gitignore`(node_modules/dist/エディタ/OS由来ファイル、`.claude` を除外)と `README.md`(概要・技術スタック予定・セットアップ手順・学習プロセス)を ts-tetris を参考に作成。
  - ts-tetris の `.claude/hooks/worklog-session-start.sh` と `worklog-stop-check.sh` を移植し、`.claude/settings.json` に SessionStart/Stop フックとして登録。セッション終了時に `work-log.md` が未更新だと終了がブロックされる仕組みが react-todo でも有効になっていることを、このエントリ追記自体がブロックを解消する形で確認した。
  - `.claude/settings.local.json` に `outputStyle: "Learning"` を設定。
  - ts-tetris の実際の初期コミット(`faccb30`)のファイル構成を `git show --stat` / `git ls-tree` で確認し、react-todo の現状(5ファイル)と完全一致することを確認。`.devcontainer/` や `.github/workflows/` はts-tetris でもステップ11〜13相当まで存在しなかったため、現段階での追加は不要と判断。
- 詰まった点: なし
- 新しく理解したReactの概念: (該当なし。リポジトリ整備のみ)
- 次回やること: ステップ1(Vite react-ts 環境構築 + ts-tetris の tsconfig/ESLint/Prettier 設定の移植)に着手する。

## 2026-09-10 (3)

- マイルストーン / ステップ: 第0マイルストーン / 1. Vite(react-ts)環境構築 + ts-tetris設定移植(完了)
- やったこと:
  - スクラッチパッドで `npm create vite@latest -- --template react-ts` を実行し、`index.html` / `package.json` / `tsconfig*.json` / `vite.config.ts` / `src/` / `public/` をプロジェクトルートに移植。
  - 最新のcreate-viteテンプレートではデフォルトlinterがESLintから**oxlint**に変わっていることが判明(`.oxlintrc.json`が生成される)。学習計画書3節・7節がESLint + `eslint-plugin-react-hooks`(特に`exhaustive-deps`)を明記していたため、ユーザーに確認しESLintを採用する方針で進めた。
  - `tsconfig.app.json`(ブラウザ向け・`src/`用)と`tsconfig.node.json`(Node向け・`vite.config.ts`用)の両方に `strict: true` と `noUncheckedIndexedAccess: true` を追加。ts-tetrisの単一`tsconfig.json`と違い、react-tsテンプレートではProject References(`tsc -b`)で2種類の実行環境(ブラウザ/Node)を分離している構成だった。
  - `eslint.config.js` をts-tetris版をベースに作成。`eslint-plugin-react-hooks` v7の `configs.recommended` は配列形式`plugins`(ESLint 9以前互換)でFlat Config非対応だったため、`configs.flat["recommended-latest"]` を使うよう修正して解決(`node -e`でパッケージの実際のエクスポートを調べて確認)。
  - `.prettierrc` / `.prettierignore` をts-tetrisから移植。`npm run format:fix` でVite雛形のフォーマットを統一。
  - `npm run dev` / `typecheck` / `lint` / `format` がすべて通ることを確認。ユーザー自身が `npm run dev` を実行しブラウザで画面表示を確認済み。
  - ユーザーからの質問に回答: `tsconfig.app.json`/`tsconfig.node.json`分割の理由(ブラウザ向けコードとNode向けコードで必要なグローバル型・モジュール解決方式が異なるため)、`vite.config.ts`を`.ts`にする利点(補完/型チェック/プラグインの型安全性)、それがReact導入と無関係であること(`vanilla-ts`テンプレートを実際に生成して比較し、素の`vanilla-ts`にはvite.config自体が生成されないことを確認。`.ts`化は「設定すべきプラグインがあるかどうか」に依存し、React固有の話ではない)。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): TS由来ではなくツールのエコシステム由来。Vite最新テンプレートのデフォルトlinterがoxlintに変わっていたこと、`eslint-plugin-react-hooks` v7のFlat Config用エクスポート名(`configs.flat["recommended-latest"]`)が非自明だったことが「詰まった点」に近い。いずれも`.d.ts`ではなくpackageの実際のエクスポートを確認して解決した点は2.4節の主旨に沿う経験だった。
- 新しく理解したReactの概念: (該当なし。ステップ1は環境構築が主眼)
- 次回やること: ステップ2(`eslint-plugin-react-hooks`は導入済みのため、ts-tetrisとのパラダイムの違いの言語化が中心)に着手する。
