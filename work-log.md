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
| 第0 | 2. eslint-plugin-react-hooks導入 + パラダイムの違いの言語化 | 完了 |
| 第1: fetchなしのReact基礎 | 3. useStateとpropsでハードコード配列を表示 | 完了 |
| 第1 | 4. 追加・削除・完了トグル(状態の不変更新) | 完了 |
| 第1 | 5. コンポーネント分割 | 完了 |
| 第1 | 6. useEffect初体験 — localStorage永続化 | 完了 |
| 第2: 通信とバリデーション | 7. json-server導入 + TodoRepositoryインターフェース設計 | 完了 |
| 第2 | 8. fetchによるCRUDと3状態の判別可能ユニオン | 完了 |
| 第2 | 9. Zod導入 + 型定義(.d.ts)を読む | 完了 |
| 第2 | 10. Vitest + React Testing Library(最小限、基本部分) | 完了 |
| 第2 | 10-a. Appの依存性注入 + InMemoryTodoRepository + Appの描画テスト | 完了 |
| 第3: 外部APIとCORS | 11. Nager.Dateから祝日を取得して表示に反映 | 完了 |
| 第3 | 12. CORSに当たる → Viteのproxyで回避(内閣府祝日CSVを題材に) | 完了 |
| 第3 | 12-a. 祝日の取得元を内閣府CSVに差し替え | 未着手 |
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
ステップ2(パラダイムの違いの言語化)完了。「グローバルGameState+rAFポーリング」から「コンポーネントごとのuseState+イベント駆動の自動再レンダリング」への転換を学習者が自分の言葉で説明できることを確認済み。
ステップ3(useStateとpropsでハードコード配列を表示)完了。`Todo`型、`TodoItemProps`型を学習者が定義し、`key`の役割(要素の同一性の保持)を正しく言語化できることを確認済み。
ステップ4(追加・削除・完了トグル)完了。`src/todoOperations.ts`に`toggleTodo`/`removeTodo`/`addTodo`の3つの純粋関数を実装済み。`App.tsx`(useState<readonly Todo[]>、setTodos、各ハンドラ、追加フォーム)と`TodoItem.tsx`(onToggle/onRemove props、チェックボックスのonChange、削除ボタン)の配線はClaudeが実装。ブラウザでの動作確認(トグル/削除/追加/最後の1件の削除)まで完了。
ステップ5(コンポーネント分割)完了。`App.tsx`を`AddTodoForm.tsx`(追加フォーム)と`TodoList.tsx`(一覧表示)に分割し、`todos`stateは`App`のみが持つ設計にした。
ステップ6(useEffect初体験 — localStorage永続化)完了。ts-tetrisの`loadFromStorage<T>`を`src/storage.ts`に移植(型ガード`isValidTodos`/`isValidTodo`、`loadFromStorage`、`saveToStorage`)。`App.tsx`は`useState`の初期化関数で起動時に一度だけlocalStorageを読み込み(なければ`initialTodos`にフォールバック)、`useEffect(() => { saveToStorage(...) }, [todos])`で`todos`が変わるたびに書き込む設計にした。
GitHub issueでの進捗管理を開始(マイルストーン0〜4を親issue、ステップ1〜16を子issueとしてSub-issues機能で紐付け。完了済みのマイルストーン0・1とステップ1〜6はclose、ステップ7以降はopenのまま)。
ステップ7(json-server導入 + TodoRepositoryインターフェース設計)完了。json-server(v1 beta)を導入し`db.json`(初期3件)と`npm run server`(port 3001)を用意。`src/todoRepository.ts`に`TodoRepository`インターフェース(list/create/update/remove)と入力用の`TodoInput`型を学習者が定義。
ステップ8(fetchによるCRUDと3状態の判別可能ユニオン、issue #13)完了。`src/todoRepository.ts`に`JsonServerTodoRepository`(`fetch`ベースの実装)をClaudeが実装。`src/types.ts`の`AsyncState<T>`判別可能ユニオン型(`status`で判別する`loading`/`error`/`success`)は学習者が実装。`App.tsx`は`useState<AsyncState<readonly Todo[]>>`+`useEffect`での初回`list()`取得(競合状態を避ける`cancelled`フラグ付き)に全面書き換え。追加/トグル/削除はrepository経由の非同期処理に変更し、`todoOperations.ts`の`addTodo`はサーバ発行のIDを使うようシグネチャを変更(`crypto.randomUUID()`生成をやめ、完成済み`Todo`を受け取る形に)。`storage.ts`は削除せず維持(ステップ13でGitHub Pages用`LocalStorageTodoRepository`として再利用見込み)。
ステップ9(Zod導入 + 型定義を読む)完了。`npm install zod`で導入(v4.6.5)。`src/types.ts`の`Todo` interfaceを廃止し、`TodoSchema`(Zodスキーマ、学習者が実装。`title`に`.min(1)`制約あり)を唯一の情報源として`Todo`型を`z.infer<typeof TodoSchema>`で導出する設計に変更。`node_modules/zod`の`.d.ts`を実際に開き、`z.infer`→`_zod.output`(型だけのマーカープロパティ)→`ZodObject`のマップ型による各フィールドの再帰的な型抽出、という仕組みを学習者自身が`grep`で追跡し理解した(learning-plan.md 2.4節の`.d.ts`読解1回目)。`src/todoRepository.ts`の`parseJsonResponse`を型アサーション(`as T`)から`schema.parse(data)`による実行時検証に変更(Claudeが実装)。`storage.ts`の手書き型ガードは今回あえてZod化せず維持(ステップ13での作り直し時にまとめて対応する方針)。
ステップ10(Vitest + React Testing Library、最小限)着手。`vitest` / `jsdom` / `@testing-library/react` / `@testing-library/jest-dom` / `@testing-library/user-event` / `@vitest/eslint-plugin`を導入(すべてClaudeが実装、learning-plan.md 2.2節の「テストのボイラープレート」に該当)。`vite.config.ts`に`/// <reference types="vitest/config" />`+`test: { environment: "jsdom", setupFiles: ["./src/setupTests.ts"] }`を追加、`src/setupTests.ts`で`@testing-library/jest-dom/vitest`を読み込みDOM用マッチャーを有効化、`package.json`に`test`/`test:watch`スクリプトを追加、`eslint.config.js`に`*.test.{ts,tsx}`向けの`@vitest/eslint-plugin`設定を追加。ts-tetrisの既存スタイル(`describe`/`it`/`expect`を明示import、`globals: true`は不使用)を踏襲。`npm run typecheck` / `npm run lint`は通過確認済み。`src/todoOperations.test.ts`にスケルトン(import文のみ)を用意し、`toggleTodo`/`removeTodo`/`addTodo`の純粋関数テストをTODO(human)として学習者に依頼、実装待ちのままセッション終了。
ステップ10(基本部分)完了。`todoOperations.test.ts`の純粋関数テスト5件、`TodoItem.test.tsx`の描画テスト6件をそれぞれ学習者が実装(レビューで数点の不変性違反・JSX呼び出し忘れ等のバグを対話で自力修正済み、詳細は当該日付のエントリ参照)。ステップ10-a(`App`の依存性注入+`InMemoryTodoRepository`実装+`App`の描画テスト)と、`todoOperations.test.ts`の不変性テスト(保留分)は未着手のまま残した。
ステップ10-a(`App`の依存性注入 + `InMemoryTodoRepository` + `App`の描画テスト)完了。`App.tsx`の`repository`をモジュールスコープの定数からpropsに変更(`AppProps`型は学習者が実装。当初`repository?: TodoRepository`+デフォルト値`new JsonServerTodoRepository()`を選択)。この状態で`useEffect`の依存配列に`repository`を含めるとどうなるかを議論する中で、学習者自身が「デフォルト値(`new`)は再レンダリングのたびに再評価され新しい参照になるため、依存配列に含めると無限ループの罠になりうる」ことに気づき、`main.tsx`側でモジュールスコープの定数として`repository`を1つ生成し`<App repository={repository} />`と明示的に渡す設計に変更(Claudeが実装)。あわせて`AppProps.repository`を必須化し`App`側のデフォルト値を削除(理由: 型で「省略不可」を保証しないと将来同じ罠が復活するため)。`useEffect`の依存配列は学習者の判断で`[repository]`に変更。`InMemoryTodoRepository`(list/create/update/remove、いずれも内部配列を不変更新)は`JsonServerTodoRepository`と同じ「具象実装」として今回もClaudeが実装(ステップ7・8の前例を踏襲)。`src/App.test.tsx`に`App`の描画テスト(初期表示/追加/トグル)をTODO(human)として学習者が実装。レビューで3点指摘: (1)`repository`をモジュールスコープで1回だけ生成しテスト間で共有していた問題(テストの独立性違反)、(2)トグルのテストで`cleanup`+再`render`により実際には「同じ画面上での再レンダリング」を検証できていなかった問題、(3)`previousElementSibling`というDOM構造依存の脆い取得方法。いずれも対話で自力修正(`beforeEach`内で`repository`を作り直す/`cleanup`+再`render`を削除しクリック直後を直接検証/`closest("li")`+`within(...).getByRole("checkbox")`に変更)。`npm run typecheck`/`lint`/`format`/`test`(3ファイル14件)すべて通過。学習者が新しく理解した概念を正確に言語化(下記)。

ステップ11(Nager.Dateから祝日を取得して表示に反映)完了(2026-09-26)。保留していた不変性テストは学習価値が低いと判断してスキップし、独立issue #23 に分離。#15(ステップ10)・#4(マイルストーン2)をclose。`TodoSchema`に`dueDate: z.iso.date().nullable()`を追加(学習者)し、`AddTodoForm`に`<input type="date">`(未入力`""`→`null`変換)、`TodoItem`に期限日と祝日名の表示を追加。`src/holidays.ts`に`HolidaySchema`(`date`/`localName`のみ、学習者)・`fetchHolidays(year)`(Claude)・純粋関数`findHoliday(dueDate, holidays)`(学習者)を配置。`App`は祝日用の独立した`holidayState: AsyncState<readonly Holiday[]>`を持ち、`holidays`は成功以外なら`[]`に倒す導出値として描画時に計算(取得失敗時も祝日名が出ないだけで一覧は壊れない)。祝日取得関数も`repository`同様に`App`のprops(`fetchHolidays: (year: number) => Promise<readonly Holiday[]>`)で注入し、`main.tsx`から本物、`App.test.tsx`から固定データの偽物を渡す(テスト中の外部通信を解消)。年は`2026`ハードコード。`storage.ts`の型ガードは`dueDate`未対応のまま(ステップ13でZod化予定)。ステップ12着手時の申し送り: Nager.Dateは`access-control-allow-origin: *`を返すためCORSが再現しない。typecheck/lint/format/test(3ファイル15件)通過。

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

## 2026-09-11

- マイルストーン / ステップ: 第0マイルストーン / 2. eslint-plugin-react-hooks導入 + パラダイムの違いの言語化(完了)
- やったこと:
  - `src/App.tsx` に残っていたVite雛形のカウンターボタン(`useState` + `onClick`)を教材に、宣言的UIと再レンダリングの考え方をClaudeから説明。
  - learning-plan.md 1.3節の対応表(描画/更新タイミング/状態の置き場所/副作用/データの出所)を提示し、ts-tetrisのゲームループがReactではどこに「消えた」のかを学習者自身の言葉で説明するよう依頼。
  - 手を動かす小実験として、`App()` 先頭に `console.log` を一時的に足してカウンターボタンをクリックし、関数が丸ごと再実行される様子をDevToolsのConsoleで確認する方法を提示(learning-plan.md 8節に沿った方法)。
  - 学習者が「ts-tetrisは1つのグローバルGameStateを持ちrequestAnimationFrameで再レンダリングしていたが、Reactでは各コンポーネントがuseStateを持ち、状態が変わるとReactが自動的に再レンダリングする」と説明し、核心を正確に言語化できたことを確認。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): (該当なし。今回は説明フェーズ)
- 新しく理解したReactの概念: 「監視して気づく(ポーリング)」から「呼ばれたら動く(イベント駆動のスケジューリング)」への転換。また、状態をコンポーネント単位に分散させることで再計算の範囲を区切っている、という含意。
- 次回やること: ステップ3(`useState`とpropsでハードコード配列を表示)に着手する。Todo型の定義から開始。

## 2026-09-11 (2)

- マイルストーン / ステップ: 第1マイルストーン / 3. useStateとpropsでハードコード配列を表示(完了)
- やったこと:
  - `src/types.ts` に `Todo` 型(`id: string` / `title: string` / `done: boolean`)を学習者が定義。TODO(human)を提示。
  - Vite雛形の中身(カウンターボタン等)を撤去し、`src/App.tsx` を `useState<Todo[]>` でハードコードした3件のTodoを保持する形に書き換え(Claudeが実装)。
  - `src/TodoItem.tsx` を新規作成し、`todo` を1件受け取ってチェックボックス付きで表示する形に。`TodoItemProps` の型定義(`todo: Readonly<Todo>`)は学習者がTODO(human)として実装。`Readonly<Todo>` を選んだ理由(4.2節の不変性の発想をpropsにも適用)を確認。
  - `npm run typecheck` / `npm run lint` / `npm run format:fix` すべて通過を確認。
  - `<TodoItem key={todo.id} todo={todo} />` の `key` の役割について、学習者と1往復の議論。最初の回答(「必要なときだけ再レンダリング」)はReact.memoによる最適化の話と混同していたため、真ん中の要素を削除したときのindex-keyの不具合例を提示して修正を促し、最終的に「一意な識別子として要素の同一性を保ち、削除・並び替え時にもDOM/内部状態を正しく対応付ける」という正しい説明に到達。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): React由来。`key`の役割をReact.memoによる再レンダリング最適化と混同する誤解が最初に出たが、具体例(配列途中の削除とindex-keyのズレ)を示して解消した。
- 新しく理解したReactの概念: `key`は「配列要素の同一性(identity)をレンダリング間で保つための識別子」であり、再レンダリングの要否を制御する最適化とは別物であること。`Readonly<T>`というTypeScriptのMapped Typeについても軽く触れた。
- 次回やること: ステップ4(追加・削除・完了トグル — 状態の不変更新)に着手する。

## 2026-09-12

- マイルストーン / ステップ: 第1マイルストーン / 4. 追加・削除・完了トグル(状態の不変更新)(完了)
- やったこと:
  - 進め方について学習者に確認し、「不変更新ロジックを`src/todoOperations.ts`の独立した純粋関数(`toggleTodo`/`removeTodo`/`addTodo`)として切り出し、そこをTODO(human)にする」方針を採用(理由: ステップ10でのテスト再利用性を先取りできるため)。
  - `src/todoOperations.ts`を新規作成。3関数の型シグネチャ(`readonly Todo[]`を受け取り`readonly Todo[]`を返す)とコメントによるTODO(human)を配置。
  - `TodoItem.tsx`に`onToggle`/`onRemove`コールバックpropsを追加し、チェックボックスの`onChange`と削除ボタンの`onClick`から呼び出す形に配線(Claudeが実装)。
  - `App.tsx`を`useState<readonly Todo[]>`+`setTodos`に変更し、`handleToggle`/`handleRemove`/`handleAdd`の3ハンドラと、新規追加用の`<form>`(`newTitle`のuseStateを含む)を実装(Claudeが実装)。
  - `noUnusedParameters`によりプレースホルダ関数が型チェックエラーになったため、`void id;`/`void title;`で一時的に抑制し、typecheck/lintの通過を確認(学習者の実装完了後にこれらの行は削除された)。
  - 学習者の1回目の実装には2つのバグがあった: (1) `todos[Number(id)]`で`id`を配列インデックスとして扱っていたため、ハードコードされた小さい整数id("1"等)では偶然動くが`crypto.randomUUID()`で生成したidでは`undefined`になり、追加したTodoのトグル・削除が効かない。(2) `toggleTodo`で`filter`により取り出した要素(元の配列と同一参照)に対して`todo.done = !todo.done`と直接mutateしていたため、4.2節の不変性原則に反していた。ブラウザでの実地確認(①既存3件のトグル、②追加した項目のトグル/削除、③最後の1件の削除)で3つとも症状を再現させ、原因をヒント形式の質問で学習者自身に言語化させてから修正させた。
  - 1回目の修正で`removeTodo`は`filter`ベースの正しい実装に直ったが、`toggleTodo`は「`[...todos]`で配列だけ複製し中の`todo`オブジェクトは直接mutateしたまま」という状態になり、見た目上は動くが不変性が破れている状態だった。`filter`/スプレッドが配列という「箱」だけを複製し要素(オブジェクト)自体は複製しない(参照共有)という点を学習者が誤解していたため、そこを訂正し、`map`で該当要素だけ新しいオブジェクトに差し替える形に再修正させた。
  - 最終実装で`npm run typecheck` / `npm run lint`が通過し、ブラウザで3シナリオすべて期待通りに動作することを確認。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): React由来(本命)。(a) `id`を配列インデックスとして扱う誤り、(b) `filter`/スプレッドが「浅い複製」であり要素オブジェクトまでは複製しないという誤解に基づく直接mutate、の2段階でつまずいた。特に(b)は「参照が変われば再レンダリングされる」という理解を先に得ていたため、「配列を複製すれば良い」で止まってしまい、要素レベルの不変性まで意識が向いていなかった。型チェック/lintはいずれのバグも検出できず(型上は合法なコードだったため)、実地でのブラウザ確認と対話的な原因の言語化でのみ発見できた。
  補足: 環境/TS由来として、プレースホルダ実装が`noUnusedParameters`に引っかかった件も発生。
- 新しく理解したReactの概念: `setState`(`setTodos`)は新旧の値を`Object.is`で比較し、同一参照であれば再レンダリングをスキップする。「配列の複製」だけでは不十分で、変更したい要素についても新しいオブジェクトを作って差し替える必要がある(浅い複製と深い不変更新の違い)。
- 次回やること: ステップ5(コンポーネント分割)に着手する。

## 2026-09-15

- マイルストーン / ステップ: 第1マイルストーン / 5. コンポーネント分割(完了)
- やったこと:
  - セッション開始時に`learning-plan.md`/`work-log.md`を読み込み、ステップ4完了時点からの再開であることを確認。
  - 現状の`App.tsx`(フォーム+リスト表示+3ハンドラが1コンポーネントに同居)、`TodoItem.tsx`、`todoOperations.ts`、`types.ts`をレビュー。`toggleTodo`/`removeTodo`/`addTodo`いずれも不変更新の原則を満たしていることを確認。
  - `todoOperations.ts`に残っていた実装済みの`TODO(human)`コメント(ステップ4のもの)を学習者の指示で削除。
  - コードを書く前に、学習者へ分割方針を問う設計相談を実施。学習者は当初「`AddTodoForm`と`TodoList`がそれぞれ独立に`todos`stateを持つ」案を提示したが、対話の中で「兄弟コンポーネント間でstateを直接共有できない」という単方向データフローの制約に気づき、最終的に「`todos`stateは`App`のみが持ち、propsで子に渡す(state lifting up)」という正しい設計に到達。
  - `src/AddTodoForm.tsx`を新規作成。`newTitle`のuseStateとフォームJSXを持ち、`AddTodoFormProps`(`onAdd: (title: string) => void`)は学習者がTODO(human)として実装。実装過程で「`addTodo(todos, newTitle)`を呼ぶのに`todos`が要るのでは」という疑問が出たが、「`todos`を使った計算は、`todos`をすでに持っている`App`側の`handleAdd`が行う」という役割分担を説明し、コールバックpropsが「子から親への通知」であり値を`return`するものではないことの理解に至った。
  - `src/TodoList.tsx`を新規作成。`todos`/`onToggle`/`onRemove`を受け取り`TodoItem`へ橋渡しする役割。`TodoListProps`は学習者がTODO(human)として実装(1回で正しく完了)。
  - `App.tsx`を`AddTodoForm`と`TodoList`を呼び出す形に書き換え(Claudeが実装)、`handleAdd`は`(title: string) => setTodos(addTodo(todos, title))`という形に変更(`todos`はAppのclosureから参照)。
  - `npm run typecheck` / `npm run lint` / `npm run format:fix` すべて通過を確認。ブラウザで追加・トグル・削除・最後の1件削除の動作確認を学習者が実施済み。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): React由来。(a) 兄弟コンポーネントが独立したstateを持つと同期できないという誤解(単方向データフロー・state lifting upの理解不足)、(b) コールバックpropsについて「子が親の関数に必要な全データ(todos)まで渡す必要があるのでは」という誤解(親がすでに持っているデータは渡す必要がなく、新規に発生した情報だけを渡せばよいという役割分担の理解不足)。どちらも対話で正しい理解に到達。
- 新しく理解したReactの概念: (1) propsのバケツリレー/state lifting up — stateは唯一の情報源(single source of truth)として共通の親が持ち、兄弟コンポーネントはそれぞれ独立した複製を持つのではなく、propsを通じて同じ状態を参照する。(2) コールバックによる子→親通知 — 子は親から渡された関数に引数(新しく発生した情報)だけを渡して呼び出し、関数の中身(実際の状態更新ロジック)を知る必要はない。
- 次回やること: ステップ6(`useEffect`初体験 — localStorage永続化)に着手する。

## 2026-09-17

- マイルストーン / ステップ: 第1マイルストーン / 6. useEffect初体験 — localStorage永続化(完了)
- やったこと:
  - セッション開始時に`learning-plan.md`/`work-log.md`を読み込み、ステップ5完了時点からの再開であることを確認。
  - `App.tsx`/`types.ts`/`todoOperations.ts`の現状をレビューし、不変性の原則が保たれていることを再確認。
  - ts-tetrisの`src/storage.ts`(`isValidHighScore`型ガードと`loadFromStorage<T>`)を参照。型ガードの書き方は既習のため、react-todo側の`storage.ts`はClaudeが実装する方針とした。
  - 設計方針として、読み込みは`useState`の初期化関数(lazy initializer)、書き込みは`useEffect`で行う分担を提示。理由(useEffectだけで読み込みもやると初回に空配列描画→再読み込みで二度描画になる)をInsightとして説明。
  - 学習者への設計相談として、「書き込み用useEffectの依存配列には何を入れるべきか」「クリーンアップ関数は必要か」を問いかけ、学習者は「依存配列は`[todos]`、書き込みは同期処理なのでクリーンアップ不要」と正しく回答。不変更新の原則が`useEffect`の依存配列チェック(`Object.is`による参照比較)にもそのまま効くという繋がりをInsightとして補足。
  - `src/storage.ts`を新規作成(`isValidTodo`/`isValidTodos`型ガード、`loadFromStorage<T>`、`saveToStorage<T>`)。`App.tsx`の`useState`をlazy initializerに変更する配線までClaudeが実装し、書き込み用`useEffect`本体は`TODO(human)`として学習者が実装(1回で正しく完了: `useEffect(() => { saveToStorage(STORAGE_KEY, todos); }, [todos]);`)。
  - `npm run typecheck` / `npm run lint`が通過(`react-hooks/exhaustive-deps`の警告なし)を確認。学習者がブラウザで追加・トグル・削除後にリロードしても消えないこと、DevToolsのLocal Storageに`react-todo:todos`キーでJSONが保存されていることを実地確認。
  - 学習者に「新しく理解したReactの概念」を一言で言わせたところ、(1)読み込みをuseEffectでなくuseStateの初期化関数で行う理由(二度描画の回避)、(2)依存配列の3パターン(空配列=初回のみ/特定変数=変更時/省略=毎回)を正しく言語化。ただし「依存配列を指定しないと無限ループのリスクがある」という表現がやや不正確だったため、「無限ループが起きるのはuseEffect内でsetStateを呼び、かつその実行条件が満たされ続ける場合」という条件を補足し、今回の実装(setStateを呼んでいない)は依存配列の書き方によらず無限ループにならないことを確認した。
  - TODOコメントを削除し、typecheck/lint/format:fixが全て通過することを確認。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): React由来(軽微)。「依存配列なし=即無限ループのリスク」という理解がやや粗く、「中でsetStateを呼んでいるか」という条件が抜けていた。対話で訂正済み。
- 新しく理解したReactの概念: (1) 読み込みは`useState`の初期化関数(lazy initializer)、書き込みは`useEffect`という役割分担 — 両方をuseEffectでやると初回に無駄な二度描画が起きる。(2) `useEffect`の依存配列チェックは`Object.is`による参照比較であり、不変更新の原則(ステップ4)がここでも効いてくる。(3) 無限ループは「依存配列の書き方」単体ではなく「useEffect内でのsetState呼び出し + その実行条件」の組み合わせで起きる。
- 次回やること: ステップ7(json-server導入 + `TodoRepository`インターフェース設計)に着手する。

## 2026-09-18

- マイルストーン / ステップ: (該当なし。React学習ではなく開発運用タスク)
- やったこと:
  - GitHub issueでの進捗管理を導入。まずステップ7のissue(タイトル・ボディはClaudeが作成)を学習者自身が`gh issue create`で手動作成する練習を実施(→ #1)。
  - `gh`のバージョン(2.101.0)がSub-issues機能(`gh issue create --parent` / `gh issue edit --parent`)に対応していることを確認。
  - マイルストーン0〜4を親issue(#2〜#6)、ステップ1〜6・8〜16を子issue(#7〜#21、`--parent`で対応するマイルストーンに紐付け)として一括作成するスクリプトを`/tmp`のスクラッチパッドに作成し実行。既存のステップ7issue(#1)には`gh issue edit --parent`で後からマイルストーン2(#4)を親として設定。
  - 完了済みのマイルストーン0・1(#2, #3)とステップ1〜6(#7〜#12)は作成後`gh issue close`でclose(work-log.md参照のコメント付き)。ステップ7以降・マイルストーン2〜4はopenのまま。
  - `gh issue list --state all`で全21件の状態(親子関係・open/closed)を最終確認。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): (該当なし)
- 新しく理解したReactの概念: (該当なし。開発運用タスクのため)
- 次回やること: ステップ7(#1)に着手する。

## 2026-09-18 (2)

- マイルストーン / ステップ: 第2マイルストーン / 7. json-server導入 + TodoRepositoryインターフェース設計(完了)
- やったこと:
  - `json-server`をdevDependencyとして導入。npm registryの最新版がv1.0.0-beta.15であることが判明し、v0系とCLIオプションが大きく異なる(`--watch`オプションが無い等)ため、実際に一時ファイルでCRUD(GET/POST/PATCH/DELETE)を検証してから採用可否を判断。POSTでの自動採番IDがデフォルトで文字列(nanoid風)になっており、learning-plan.md 4.4節の「IDはstringにする」前提と相性が良いことを確認。
  - `db.json`(初期Todo3件、これまでのハードコード配列と同じ内容)を作成。`package.json`に`"server": "json-server db.json --port 3001"`を追加し、`npm run server`で`http://localhost:3001/todos`が配信されることを確認。
  - `src/todoRepository.ts`を新規作成。`TodoRepository`インターフェース(list/create/update/remove)は学習者がTODO(human)として実装。1回目の実装で`TodoInput`型を使用しているのに定義しておらず`tsc`エラー(`Cannot find name 'TodoInput'`)。学習者が`Omit<Todo, "id" | "done">`で解決。
  - 2回目のレビューで2点指摘: (a) `interface TodoInput extends Omit<...> {}`という空interfaceの継承が`@typescript-eslint/no-empty-object-type`に抵触 → `type`エイリアスに変更、(b) `update`のpatch型が`Partial<TodoInput>`(=`title`のみ)になっており、ステップ4の`toggleTodo`(`done`の切り替え)をこのリポジトリ経由で呼べない設計上の欠陥。対話で「`Partial<Todo>`だと`id`も紛れ込む」ことに気づかせ、最終的に`Partial<Omit<Todo, "id">>`に修正。
  - `npm run typecheck` / `npm run lint` / `npm run format`すべて通過を確認。TODOコメントを削除。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): TS由来。(a) 型を使う前に定義し忘れるという単純なミス、(b) `create`用の入力型(`TodoInput`)と`update`用のpatch型を同じ型で済まそうとした設計判断のミス(除くべきフィールドの理由が違う: サーバが決める値を除くのか、別引数で渡しているから除くのか)。両方とも対話で自力修正に至った。環境由来として、npm registryのjson-serverデフォルトバージョンがv1 betaに変わっており、CLIオプション体系がv0系と別物になっていた点も判明(検証してから採用)。
- 新しく理解したReactの概念: (TypeScript寄りの学びが中心)`Partial<T>`は全プロパティを任意にする、`Omit<T, K>`は指定したキーを除く。同じ`Omit`でも「サーバが決めるので呼び出し側が渡せない値を除く」(`TodoInput`)と「別引数で渡しているので重複させたくない値を除く」(`update`のpatch)は目的が異なり、型を使い回さず別々に定義すべきという判断基準。
- 次回やること: ステップ8(fetchによるCRUDと3状態の判別可能ユニオン、issue #13)に着手する。

## 2026-09-18 (3)

- マイルストーン / ステップ: 第2マイルストーン / 8. fetchによるCRUDと3状態の判別可能ユニオン(進行中)
- やったこと:
  - セッション開始時に`learning-plan.md`/`work-log.md`を読み込み、ステップ7完了時点からの再開であることを確認。`App.tsx`(localStorageベースの状態管理)、`todoRepository.ts`(インターフェースのみ)、`types.ts`の現状をレビュー。
  - json-server(port 3001)が起動済みで`/todos`に到達できることを確認。
  - `src/todoRepository.ts`に`JsonServerTodoRepository`クラスを新規実装(Claudeが実装。fetchは学習者未経験のためライブラリ/API呼び出しとして提示)。`list`/`create`/`update`/`remove`をfetchで実装し、共通の`parseJsonResponse<T>`ヘルパーで`response.ok`チェックと`json()`パースをまとめた。`fetch`は4xx/5xxでもPromiseがrejectしない(ネットワーク自体が繋がらない場合のみrejectする)という、ts-tetrisには無かった`fetch`特有の注意点をInsightとして説明。
  - `npm run typecheck` / `npm run lint`が通過することを確認。
  - `src/types.ts`に`AsyncState<T>`判別可能ユニオン型のTODO(human)を設置し、Learn by Doing requestを送信。ts-tetrisの`GameState`と同じ発想(読み込み中/エラー/成功の3バリアントを共通プロパティで判別)であることをガイダンスとして提示。学習者の実装待ちのままセッション終了(Stop hookにより本エントリを追記)。
  - `storage.ts`(localStorage版)は削除せず維持する方針を確認。ステップ13でGitHub Pages用の`LocalStorageTodoRepository`として再利用する見込みのため。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): (該当なし。ここまではClaude実装分とTODO(human)設置のみ)
- 新しく理解したReactの概念: (学習者のTODO(human)実装待ちのため、このエントリでは未確定。次回セッションで確認する)
- 次回やること: `src/types.ts`の`AsyncState<T>`実装内容をレビューする。その後`App.tsx`を書き換え、(1)`useState<AsyncState<readonly Todo[]>>`への移行、(2)`useEffect`での初回`list()`呼び出し、(3)追加/削除/トグルをrepository経由の非同期処理に変更、(4)loading/error/successの3状態を画面に出す、という順に進める。

## 2026-09-18 (4)

- マイルストーン / ステップ: 第2マイルストーン / 8. fetchによるCRUDと3状態の判別可能ユニオン(完了)
- やったこと:
  - 学習者が`src/types.ts`に`AsyncState<T>`を実装(`{status: "loading"} | {status: "error", message: string} | {status: "success", data: T}`)。正しい判別可能ユニオン設計だったためTODOコメントを削除しtypecheck/lint/format通過を確認。
  - `App.tsx`を全面書き換え。`repository`インスタンスをモジュールスコープで1回だけ生成する理由(コンポーネント内で`new`すると`react-hooks/exhaustive-deps`が依存配列漏れを警告する)を学習者と対話で確認し、`useEffect`の依存配列`[]`の妥当性を導いた。
  - `useEffect`内の初回`list()`呼び出し+競合状態対策(`cancelled`フラグ)をTODO(human)として設置し、学習者が実装。
    - 1回目の実装は`if (!cancelled)`のチェック位置が`repository.list()`を呼ぶ**前**(常に`false`で無意味)になっていたバグ。対話で「`cancelled`が`true`になり得るのはレスポンスが返ってきた後」であることに気づかせ、`.then`/`.catch`内、`setState`直前に移動させて解決。
    - 修正の過程で`if (cancelled) return cleanup;`という記述が登場。学習者の意図は「クリーンアップ関数が登録される前に早期リターンされることを懸念した」というものだったが、実際は`useEffect`本体の`return cleanup`は同期的に即座に実行されるため`.then()`コールバック実行時には確実に登録済みであり、その心配は不要だったこと、`.then()`内の`return`はその関数自身の戻り値(使われず捨てられる)にしかならないことを説明し、`return;`に簡略化。
    - 加えて、Claude側が用意した骨格に`useEffect`冒頭の`setState({status: "loading"})`という冗長な呼び出しがあり、新しいESLintルール`react-hooks/set-state-in-effect`(effect内の同期的setStateがカスケード再レンダリングを招くという警告)に抵触。初期状態が既に`loading`であるため無用な呼び出しであり、Claudeの実装ミスとして削除して解決。
  - `todoOperations.ts`の`addTodo`のシグネチャを`(todos, title)`から`(todos, newTodo: Todo)`に変更(Claudeが実装、IDをサーバ側で発行するアーキテクチャ変更に伴う直接的な帰結として説明した上で)。
  - `handleToggle`/`handleRemove`/`handleAdd`をrepository経由の非同期処理に配線(Claudeが実装。楽観的更新はスコープ外のためサーバのレスポンスを待ってから状態を更新する方式)。loading/error/successをJSXで出し分け。
  - `npm run server`実行時に`EADDRINUSE`エラーが発生。原因はステップ7検証時からport 3001でjson-serverプロセス(PID 70460)が起動しっぱなしだったこと(`ps aux`で確認)。既存プロセスがそのまま使えるため実害なしと説明。
  - ブラウザで3パターンすべて確認済み: (1)一覧のサーバからの取得表示、(2)追加/トグル/削除がサーバ側にも反映、(3)`npm run server`停止時にクラッシュせず「エラーが発生しました」表示になること。
  - 学習者が新しく理解したReactの概念を4点、正確に言語化(下記)。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): React由来が中心。(a)`cancelled`チェックの位置(同期処理内でチェックしても意味がない、非同期コールバック内でチェックする必要がある)、(b)`.then()`コールバック内の`return`が`useEffect`本体のreturnとは無関係であるという誤解、(c)Claude側のミスとして`react-hooks/set-state-in-effect`(effect内の同期的setStateへの新しいlint警告)。環境由来として、前セッションのjson-serverプロセスが残っていたことによる`EADDRINUSE`(実害なし)。
- 新しく理解したReactの概念: (1)`fetch`はHTTPレスポンスが返ってきた時点で成功扱いになり、ステータスコードが200番台かどうかは自分でチェックする必要がある(4xx/5xxでもPromiseはrejectしない)。(2)`useEffect`内で使う値が「毎回同じでよいもの」はコンポーネントの外(モジュールスコープ)に出す — コンポーネント内で`new`すると依存配列の警告(`exhaustive-deps`)が出る場合がある。(3)`useEffect`のクリーンアップ関数を返す`return`は、常に「一番内側の関数」に紐づく — `.then()`などのコールバックの中で`return`しても、それは`useEffect`本体のreturnとは無関係。
- 次回やること: ステップ9(Zod導入 + 型定義(`.d.ts`)を読む)に着手する。ステップ6で書いた`storage.ts`の手書き型ガード(`isValidTodo`/`isValidTodos`)と、Zodスキーマを同じ画面に並べて比較し、何が自動化されたのかを言語化させる(learning-plan.md ステップ9の注意点)。

## 2026-09-19

- マイルストーン / ステップ: 第2マイルストーン / 9. Zod導入 + 型定義(.d.ts)を読む(完了)
- やったこと:
  - セッション開始時に`learning-plan.md`/`work-log.md`を読み込み、ステップ8完了時点からの再開であることを確認。`types.ts`/`storage.ts`/`todoRepository.ts`の現状をレビュー。
  - `npm install zod`でZod(v4.6.5)を導入。v3系とv4系で型定義ファイルの構造が異なる点をInsightとして説明(後で`.d.ts`を読む際は必ずv4系を見るよう注意喚起)。
  - 設計方針を学習者に相談: 既存の`Todo` interfaceを手書きのまま残すか、`TodoSchema`(Zod)を唯一の情報源にして`Todo`型を`z.infer`で導出する方針に切り替えるか。学習者は後者(推奨案)を選択。
  - `src/types.ts`を編集し、`Todo` interfaceを`TodoSchema`(TODO(human))+`export type Todo = z.infer<typeof TodoSchema>`に置き換え。フィールド(id/title/done)と、titleへの制約(空文字列を許すか等)を学習者自身の判断に委ねるガイダンスを添えてLearn by Doing requestを送信。学習者の実装待ちの状態で一度Stop hookが発火し中断。
  - 学習者が`TodoSchema`を実装(`id`/`title`/`done`に加え、`title`に`.min(1, "タイトルは必須です")`の制約を独自に追加)。typecheck/lint/format全て通過を確認しTODOコメントを削除。`db.json`のフォーマット崩れ(過去セッションのCRUD操作由来、今回の変更とは無関係)も合わせて`format:fix`で修正。
  - `storage.ts`の手書き型ガード`isValidTodo`とZodの`TodoSchema`を比較する対話を実施。学習者は「型のチェックはisValidTodoが手作業でやっていたことをTodoSchemaが自動でやってくれる」と正しく言語化。
  - `TodoSchema.parse(不正な値)`を実際に試させ、`parse`は失敗時に例外をthrowし、`safeParse`はthrowせず`{success, data|error}`を返すという違いを学習者が実地で確認し正しく説明。
  - `.d.ts`読解(learning-plan.md 2.4節の必須課題、今回で1回目)を実施。`node_modules/zod/index.d.ts` → `v4/classic/external` → `Infer<T>`/`output<T>`(`T["_zod"]["output"]`という型レベルのインデックスアクセス) → `ZodObject`の`$InferObjectInternals`/`$InferObjectOutput`(`optional`の有無で2つのマップ型に振り分けてintersectする構造)まで、学習者自身に`grep`で辿らせながら追跡。「`_zod`は実行時に値を持たない型だけのマーカープロパティ(phantom property)」という中心的な仕組みと、「各フィールド自身の`_zod.output`をキーごとに再帰的に取り出すマップ型」という`ZodObject`の実装原理を、学習者が最終的に自分の言葉で説明できることを確認(初回「z.T()を実行し」という表現には型レベルの操作であり実行時の呼び出しではない旨を訂正した)。
  - `src/todoRepository.ts`の`parseJsonResponse`を`(await response.json()) as T`という型アサーションから`schema.parse(data)`(Zodスキーマによる実行時検証)に変更(Claudeが実装。`list`は`z.array(TodoSchema)`、`create`/`update`は`TodoSchema`を使用)。4.6節「外部から来たデータは必ず検証する」がここで実現された。typecheck/lint/format全て通過。
  - ブラウザで一覧表示・追加・トグル・削除の動作確認を学習者が実施し、問題なしを確認。
  - `storage.ts`の手書き型ガードをあえて`TodoSchema`に統一しなかった設計判断について学習者に理由を問い、「今必要な変更ではないから残しておいてよい」という回答を得た。ステップ13で`storage.ts`が`LocalStorageTodoRepository`として作り直される予定であり、そのタイミングでまとめてZod化すれば二度手間を避けられるという補足をした。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): TS由来(`.d.ts`読解特有の難しさ)。ZodObjectの型定義(`$InferObjectOutput`)が「optionalフィールドの有無で2つのマップ型に分けてintersectする」という複雑な構造をしており、`TodoSchema`にはoptionalフィールドが無いため無視してよい分岐が多かった。学習者は複雑な型定義から自分のケースに関係する部分だけを読み解くという実務的な読み方を体験した。
- 新しく理解したReactの概念: (React由来ではなくTS/Zod寄りの学び)(1)Zodは型検証を行うライブラリであり、自前のバリデーション(型ガード)を書かなくて済むようになる。(2)`z.infer`は、スキーマの各キーについて再帰的にそのフィールド自身の`_zod.output`(型だけのマーカープロパティ)を取り出すことで、コンパイル時に型を導出する仕組み。(3)`parse`は失敗時に例外をthrowするが`safeParse`はthrowせず`{success, data}`または`{success, error}`を返す — 用途に応じて使い分ける。
- 次回やること: ステップ10(Vitest + React Testing Library、最小限)に着手する。`todoOperations.ts`の純粋関数のテストと、コンポーネント1つの描画テストを学習者に書かせる。`InMemoryTodoRepository`への差し替えでfetchなしにテストできるという4.5節の設計の御利益をここで回収する。

## 2026-09-20

- マイルストーン / ステップ: 第2マイルストーン / 10. Vitest + React Testing Library(最小限)(進行中)
- やったこと:
  - セッション開始時に`learning-plan.md`/`work-log.md`を読み込み、ステップ9完了時点からの再開であることを確認。`todoOperations.ts`/`types.ts`/`App.tsx`/`todoRepository.ts`の現状をレビュー。
  - ts-tetrisの`package.json`/テストファイル(`collision.test.ts`)を参照し、テストの書き方(`describe`/`it`/`expect`を明示import、`globals: true`は使わない)を確認した上で、react-todo側もそのスタイルを踏襲する方針とした。
  - `vitest` / `jsdom` / `@testing-library/react` / `@testing-library/jest-dom` / `@testing-library/user-event` / `@vitest/eslint-plugin`をdevDependencyとして導入(Claudeが実装、learning-plan.md 2.2節のボイラープレートに該当)。
  - `vite.config.ts`に`/// <reference types="vitest/config" />`と`test: { environment: "jsdom", setupFiles: ["./src/setupTests.ts"] }`を追加。`src/setupTests.ts`を新規作成し`@testing-library/jest-dom/vitest`をimportしてDOM用マッチャー(`toBeInTheDocument`等)を有効化。
  - `package.json`に`test`(`vitest run`)/`test:watch`(`vitest`)スクリプトを追加。`eslint.config.js`に`src/**/*.test.{ts,tsx}`向けの`@vitest/eslint-plugin`設定(`vitest.configs.recommended.rules`+`vitest.environments.env.globals`)を追加。
  - `npm run typecheck` / `npm run lint`が通過することを確認。
  - `src/todoOperations.test.ts`にimport文のみのスケルトンを作成し、`toggleTodo`/`removeTodo`/`addTodo`の純粋関数テストをTODO(human)として設置。「存在しないidを渡した場合に元の配列をそのまま返す」という境界値ケースと、不変性(引数の配列を直接mutateしていないか)の検証を含めるかという設計判断をガイダンスとして提示し、Learn by Doing requestを送信。学習者の実装待ちのままセッション終了(Stop hookにより本エントリを追記)。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): (該当なし。今回はセットアップとTODO(human)設置のみ)
- 新しく理解したReactの概念: (学習者のTODO(human)実装待ちのため、このエントリでは未確定。次回セッションで確認する)
- 次回やること: `src/todoOperations.test.ts`の実装内容をレビューする。`npm run test`で通過を確認後、コンポーネント1つの描画テストに進む。その際、`App`を対象にするなら`JsonServerTodoRepository`を`InMemoryTodoRepository`に差し替え可能にする設計変更(依存性注入)が必要になる可能性があるため、対象コンポーネント(`App`か、より単純な`TodoItem`/`AddTodoForm`か)を学習者と相談してから進める。

## 2026-09-20 (2)

- マイルストーン / ステップ: 第2マイルストーン / 10. Vitest + React Testing Library(最小限)(進行中)
- やったこと:
  - `src/todoOperations.test.ts`のTODO(human)実装をレビュー。学習者が`toggleTodo`/`removeTodo`/`addTodo`それぞれに正常系+境界値(存在しないid)のテストを実装。テストデータ生成ヘルパー`makeTodos`を自作(ts-tetrisの`makeBoard`と同じ発想)。
  - レビューで4点指摘: (1) `zod`/`zod/locales`からの未使用import(typecheckエラー)、(2) `title: "テストデータ${id}"`がテンプレートリテラルでなく通常の文字列リテラルになっており`${id}`が補間されていないバグ、(3) ガイダンスで触れた不変性(引数を直接mutateしていないか)の検証が未実装、(4) インデントがPrettier設定(2スペース)と不一致。学習者が(1)(2)(4)を自力で修正し`npm run typecheck`/`lint`/`format`/`test`が全て通過することを確認。(3)は「余裕がある時に追加する」として今回は意図的に保留(work-log上の宿題として記録)。
  - (2)のバグについて、`toEqual`による比較では検出できない理由(期待値・実際値の両方が同じ`makeTodos`ヘルパーで生成されるため、`title`の値が誤っていても両辺で一致してしまう)をInsightとして説明。「期待値を自動生成すると実装のバグを共有してしまう」というテストの死角について言語化。
  - TODOコメントを削除し、純粋関数テスト(5件)完了。
  - 次の描画テストの対象について学習者と相談。当初の想定(`App`を対象にしてInMemoryTodoRepositoryへの差し替えでDIの御利益を回収する)は規模が大きいため、学習者の希望により「ステップ10ではまず`TodoItem`のような単純な表示コンポーネントの描画テストで区切り、`App`の依存性注入+`InMemoryTodoRepository`はステップ10-a(サブステップ)として別途後で着手する」という方針に決定。learning-plan.md本体は変更せず、work-log上でこの区切りを管理する。
  - `src/TodoItem.test.tsx`にスケルトン(`render`/`screen`/`userEvent`/`vi`のimportのみ)を作成し、TODO(human)としてLearn by Doing requestを送信。学習者の実装待ちのままセッション終了(想定)。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): JS由来。テンプレートリテラル(バッククォート)と通常の文字列リテラル(ダブルクォート)の中で`${}`構文の意味が異なる(後者ではただの文字列として扱われる)という基礎的な誤りだったが、テストが`toEqual`ベースだったため通常の実行では気づきにくかった。
- 新しく理解したReactの概念: (React由来ではなくテスト設計の学び)期待値を実装と同じロジック(ヘルパー関数)で生成すると、そのロジック自体のバグをテストが検出できなくなる場合がある。
- 次回やること: `src/TodoItem.test.tsx`の実装内容をレビューする。通過確認後、ステップ10-a(`App`のリポジトリ依存性注入化 + `InMemoryTodoRepository`実装 + `App`の描画テスト)に進むかどうかを学習者と相談する。

## 2026-09-20 (3)

- マイルストーン / ステップ: 第2マイルストーン / 10. Vitest + React Testing Library(最小限、基本部分)(完了)
- やったこと:
  - `src/TodoItem.test.tsx`のTODO(human)実装をレビュー。学習者が`describe`+`beforeEach`(`render`)/`afterEach`(`cleanup`)の構成で、(1)タイトル表示、(2)チェックボックス表示、(3)`checked`状態の反映(done: false/true両方)、(4)チェックボックスクリック時の`onToggle`呼び出し、(5)削除ボタン表示、(6)削除ボタンクリック時の`onRemove`呼び出し、の6テストを実装。`vi.fn<(id: string) => void>()`によるモック関数、`userEvent.setup()`+`await user.click(...)`によるクリックシミュレーションを使用。
  - レビューで2点指摘: (1) `render(TodoItem({todo, onToggle, onRemove}))`という、コンポーネントをJSXではなくただの関数として直接呼び出す書き方になっていた(今回はフック不使用のTodoItemなので偶然動くが、Rules of Hooksに反する書き方であり将来フックを使うコンポーネントで壊れる)。(2) 3番目のテスト(checked状態確認)で`todo.done = !todo.done`と共有オブジェクトを直接mutateしており、ステップ4で踏んだのと同種の不変性違反(後続テストの`todo.done`の値が汚染される)。学習者が両方を自力で修正(JSX形式に変更、`{ ...todo, done: true }`で新しいオブジェクトを作る形に変更)し、`npm run typecheck`/`lint`/`format`/`test`(全11件)がすべて通過することを確認。
  - `afterEach(cleanup)`が必要な理由(このプロジェクトは`globals: true`を使わず`describe`/`it`/`afterEach`を明示importするスタイルのため、RTLの自動クリーンアップ機構が働かない)をInsightとして補足。
  - TODOコメントを削除。
  - learning-plan.md 8節の運用に従い、学習者に「新しく理解した概念」を言語化してもらい、(a)コンポーネントを関数として直接呼ぶとフックが機能しないためJSX形式で呼び出す必要がある、(b)`render`後は`cleanup()`で描画を消して他のテストに影響しないようにする、(c)`screen.getByText`/`getByRole`によるクエリと`toBeInTheDocument`/`toBeChecked`によるマッチャー、(d)`vi.fn()`のモック関数と`toHaveBeenCalledWith`による呼び出し引数の検証、の4点を正確に説明できることを確認。
  - ステップ10-a(`App`を`JsonServerTodoRepository`から`InMemoryTodoRepository`に差し替え可能にする依存性注入への設計変更、`InMemoryTodoRepository`の実装、`App`の描画テスト。learning-plan.mdステップ10注意点の「4.5節の設計の御利益をここで回収する」部分に相当)は今回のスコープから外し、別セッションでのサブステップとして保留。あわせて、ステップ10前半で保留した`todoOperations.test.ts`の不変性テスト(TODO3)も未着手のまま残っている。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): React由来。(a) コンポーネントをJSXでなく関数として直接呼び出す誤り(Rules of Hooksの理解不足)、(b) 描画テストの中でも不変性原則が効く(共有フィクスチャの直接mutateがテスト間の汚染を招く)という気づきの不足。どちらもステップ4で学んだ内容の応用として対話で自力修正に至った。
- 新しく理解したReactの概念: (1) コンポーネントは必ずJSXとして呼び出す — 関数として直接呼び出すとReactのレンダリングサイクル外での実行になり、フックが機能しない。(2) 不変性の原則(ステップ4)はテストの共有フィクスチャにも適用される。(3) RTLは実装の詳細(クラス名等)ではなくアクセシビリティツリー(role/name)や表示テキストで要素を探す設計思想。(4) `vi.fn()`+`toHaveBeenCalledWith`でコールバックpropsの呼び出され方を検証できる。
- 次回やること: ステップ10-a(`App`のリポジトリ依存性注入化 + `InMemoryTodoRepository`実装 + `App`の描画テスト)に着手するか、先にステップ11(Nager.Dateから祝日取得)に進み10-aは任意課題として後回しにするか、学習者と相談してから決める。あわせて`todoOperations.test.ts`の不変性テスト(保留分)の着手タイミングも確認する。

## 2026-09-24

- マイルストーン / ステップ: 第2マイルストーン / 10-a. Appの依存性注入 + InMemoryTodoRepository + Appの描画テスト(完了)
- やったこと:
  - セッション開始時に`learning-plan.md`/`work-log.md`を読み込み、ステップ10(基本部分)完了時点からの再開であることを確認。
  - 学習者に今回の進め方を相談し、「ステップ10-aから着手する」方針を選択(`todoOperations.test.ts`の不変性テスト保留分は10-aの後に回す)。
  - `App.tsx`/`todoRepository.ts`/`main.tsx`の現状をレビュー。`repository`が`App.tsx`のモジュールスコープで`JsonServerTodoRepository`に直接束縛されており差し替え不可能な状態であることを確認。
  - 依存性注入の考え方(Reactではpropsとしてそのまま表現できる、ts-tetrisには無かった概念であること)をInsightとして説明。
  - `App.tsx`の関数シグネチャを`function App({ repository }: AppProps)`まで書き換え、`AppProps`型定義をTODO(human)として設置。「repositoryを必須にして`main.tsx`で明示的に渡す」か「省略可能にしてデフォルト値を用意する」かという設計判断をガイダンスとして提示し、Learn by Doing requestを送信(この時点でStop hookが1度発火し本エントリの前身を追記)。
  - 学習者が`AppProps`を`repository?: TodoRepository`+デフォルト値`new JsonServerTodoRepository()`という設計で実装。typecheckは通過したが、lintで`react-hooks/exhaustive-deps`警告(`useEffect`が`repository`に依存しているのに依存配列`[]`に含まれていない)が発生。
  - 警告の意味をInsightとして説明した上で、「依存配列に`repository`を追加したら何が起きるか」を学習者に問いかけ。学習者は自力で「デフォルト値の`new`は再レンダリングのたびに再評価され新しい参照になるため、無限ループの罠になりうる」ことに気づき、「`App`の外(`main.tsx`)でインスタンス化する」という解決策を提案(ステップ8で学んだ「モジュールスコープに出す」発想の応用)。
  - `main.tsx`にモジュールスコープの`const repository = new JsonServerTodoRepository()`を追加し`<App repository={repository} />`と明示的に渡す形に変更(Claudeが実装)。あわせて、学習者からの追加の質問(「デフォルト値はもう消したほうが良いか」)に対し、`AppProps.repository`を必須化しないと「型はoptionalなのに実質必須」という矛盾が残り将来同じ罠が復活する、と理由を説明した上で`repository: TodoRepository`(必須)+デフォルト値削除に変更(Claudeが実装)。`useEffect`の依存配列を`[repository]`に変更する判断は学習者が回答し反映。typecheck/lint/format すべて通過。ブラウザでの動作確認も学習者が実施。
  - `InMemoryTodoRepository`をステップ7・8の前例(具象実装はClaude)に倣い`todoRepository.ts`に追記(Claudeが実装)。当初`async`メソッド内に`await`が無く`@typescript-eslint/require-await`エラーが発生したため、`async`を外し`Promise.resolve`/`Promise.reject`を明示的に返す形に修正(`throw`のままだと`async`を外した際に同期的に例外を投げてしまう点も補足)。
  - `src/App.test.tsx`にスケルトン(初期データ`initialTodos`、TODOコメント)を用意。`App`が`useEffect`経由の非同期コンポーネントであるため`screen.findByText`等の非同期クエリが必要になる点をInsightとして説明し、Learn by Doing requestを送信。
  - 学習者が初期表示/追加/トグルの3テストを実装。レビューで3点指摘: (1) `repository`をモジュールスコープで1回だけ生成しテスト間で共有していた(テストの独立性違反)、(2) トグルのテストが`cleanup()`+再`render()`後の状態しか検証しておらず「同じ画面上での再レンダリング」を確認できていなかった、(3) `previousElementSibling`によるチェックボックス取得がDOM構造への依存が強い(`within`の使用を提案)。学習者が3点とも自力で修正(`beforeEach`内で`repository`を作り直す/`cleanup`+再`render`を削除しクリック直後を直接検証/`closest("li")`+`within(liElement).getByRole("checkbox")`に変更)。
  - `npm run typecheck`/`lint`/`format`/`test`(3ファイル14件)すべて通過を確認。
  - 学習者が新しく理解した概念を正確に言語化(下記)。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): React由来が中心。(a) propsのデフォルト値(`new`式)が再レンダリングのたびに再評価され新しい参照になるため、`useEffect`の依存配列に含めると無限ループの罠になりうるという、ステップ8の教訓(モジュールスコープに出す)の一段深い応用パターン。(b) 描画テストにおけるテストの独立性違反(共有`repository`インスタンス)と、テストの検証範囲の誤り(`cleanup`+再`render`では「その場での再レンダリング」を確認できていない)。いずれも対話で学習者自身が気づき、自力修正に至った。環境由来として、`InMemoryTodoRepository`の`async`メソッドに`await`が無いことによる`@typescript-eslint/require-await`エラーが発生(Claude側の実装ミス、`Promise.resolve`/`Promise.reject`への書き換えで解決)。
- 新しく理解したReactの概念: (1) propsのデフォルト値に`new ...()`のような式を書くと、コンポーネントが再レンダリングされるたびに再評価され新しい参照が生成される。これを`useEffect`の依存配列に含めると無限ループの原因になりうるため、安定した参照が必要な値は呼び出し側(コンポーネントの外)で1度だけ生成して渡すべき。(2) `screen.findByText`等の`findBy*`クエリは非同期(Promiseを返す)で、`useEffect`を伴う非同期コンポーネントのテストでは`getBy*`ではなく`findBy*`を使う必要がある。(3) `closest()`で親要素を辿り、`within(要素)`でその要素の中だけに絞ってクエリできる — DOM構造(`previousElementSibling`等)に依存した取得より堅牢。
- 次回やること: `todoOperations.test.ts`の不変性テスト(保留分。引数の配列を直接mutateしていないかの検証)に着手するか、ステップ11(Nager.Dateから祝日取得)に進むか、学習者と相談してから決める。

## 2026-09-26

- マイルストーン / ステップ: 第3マイルストーン / 11. Nager.Dateから祝日を取得して表示に反映(完了)
- やったこと:
  - セッション開始時に`learning-plan.md`/`work-log.md`を読み込み、ステップ10-a完了時点からの再開であることを確認。
  - 保留していた`todoOperations.test.ts`の不変性テストの学習価値を学習者と検討。`readonly`型でmutateはコンパイル時に防げており、テスト間汚染の教訓もステップ10/10-aで回収済みのため「新規の学習価値は低い」と判断し、スキップしてステップ11へ進むことに決定。
  - GitHub issue整理: 予備issue #23(不変性テスト)をステップ10(#15)のsub-issueから外して独立した任意課題に変更(学習者の希望)。子issueが全てcloseになったため#15(ステップ10)と#4(マイルストーン2)をclose。
  - ステップ11の進め方を4段階に分割して提示: (1)`TodoSchema`に期限日追加(学習者)→フォーム/表示の配線(Claude)、(2)Nager.Dateレスポンス用Zodスキーマ(学習者)→取得処理(Claude)、(3)祝日判定の純粋関数(学習者)、(4)祝日の読み込み状態を`App`に組み込み取得失敗時も壊れないようにする。
  - 現状の`Todo`に期限日フィールドが無いことを確認。`src/types.ts`の`TodoSchema`に`dueDate`追加のTODO(human)を設置し、Learn by Doing requestを送信(判断ポイント: `Date`か`"YYYY-MM-DD"`文字列か、必須か`.optional()`/`.nullable()`か、既存`db.json`データとの互換性)。学習者の実装待ち。
  - 学習者が`dueDate: z.iso.date().nullable()`を実装(文字列で保持、キーは必須・値は`YYYY-MM-DD`か`null`)。typecheckで`dueDate`欠落エラーが6箇所出た一方、Vitestは型チェックをしないため14件すべて通過していた点をInsightとして説明。`.nullable()`は「キーはある・値がnull」なので、キー自体が無い既存`db.json`データは`parse`で落ちることも補足。
  - Claudeが配線: `db.json`とテストデータに`dueDate: null`を追加、`AddTodoForm`に`<input type="date">`を追加(未入力の`""`→`null`変換はフォーム境界で1回だけ行う)、`onAdd(title, dueDate)`/`handleAdd`/`create({ title, dueDate })`を更新、`TodoItem`に「(期限: …)」表示を追加。typecheck/lint/format/test(14件)通過。
  - `storage.ts`の手書き型ガード`isValidTodo`が`dueDate`を検査しないまま`value is Todo`を主張する「嘘をつく型ガード」になった点を指摘(現在未使用。ステップ13で作り直す際にZod化する)。
  - `curl`でNager.Date(`/api/v3/PublicHolidays/2026/JP`)の実レスポンスを確認し、`src/holidays.ts`を作成(`fetchHolidays(year)`はClaudeが実装、`HolidaySchema`の中身をTODO(human)として依頼)。
  - 学習者がブラウザで期限日の追加・表示を確認。
  - 学習者が`HolidaySchema`を`date`/`localName`の2フィールドのみで定義(不要フィールドは`z.object`がstripする)。当初`date: z.iso.date().nullable()`としていたため、「日付がnullの祝日は何を意味するか」「`h.date === todo.dueDate`で両方nullだと期限なしTodoが祝日扱いになる」ことを問いかけ、学習者が`.nullable()`を外して修正。「型を揃える=修飾子をコピーする、ではなく、各データの意味で決める」「緩いスキーマは内部にありえない状態を持ち込む」をInsightとして説明。
  - 祝日判定の純粋関数`findHoliday`を`src/holidays.ts`にTODO(human)として依頼。
  - 学習者の`findHoliday`初版は引数`dueDate: string`(nullは呼び出し側で弾く)・戻り値`Holiday | undefined`という型設計は良かったが、関数内で`fetchHolidays`を呼ぶ非純粋な`async`関数だった。「Todo件数ぶんAPIリクエストが飛ぶ」「TodoItemごとにuseEffectと状態が必要になる」「テストで本物の通信が発生する」点を問いかけ、学習者が`findHoliday(dueDate, holidays: readonly Holiday[])`の同期的な純粋関数(`find`使用)に書き直し。
  - Claudeが表示側を配線: `TodoList`に`holidays: readonly Holiday[]`propを追加し、各Todoについて`dueDate === null ? undefined : findHoliday(...)`を計算して`TodoItem`の`holiday?: Holiday`propに渡す。`TodoItem`は祝日なら期限日の横に`localName`を表示。
  - `App.tsx`に祝日一覧の状態・取得・`holidays`導出をTODO(human)として依頼(暫定で`const holidays: readonly Holiday[] = []`を置き、`fetchHolidays`未使用のlintエラーは学習者の実装で解消予定)。
  - 学習者が`App`に祝日用の独立した`useState<AsyncState<readonly Holiday[]>>`と`useEffect`(`cancelled`フラグ付き、依存配列`[]`、年は`2026`ハードコード)を実装。初版は`if`ブロック内で`const holidays`を宣言しておりブロックスコープ外で参照できずtypecheck/テスト失敗。指摘後、三項演算子`holidayState.status === "success" ? holidayState.data : []`に修正(失敗時は空配列に倒すことで「壊れない」をデータの既定値で実現)。typecheck/lint/format/test(14件)通過。
  - 学習者がブラウザで確認: 祝日の期限日に祝日名表示/祝日でない日は非表示/DevToolsのリクエストブロックで祝日取得を失敗させてもTodo一覧・追加・トグル・削除は正常動作し祝日名だけ消えることを確認。ステップ11の完了条件を満たした。
  - 【ステップ12への申し送り】`curl -H "Origin: ..."`で確認したところNager.Dateは`access-control-allow-origin: *`を返すため、計画書の「CORSに当たる」がNager.Dateでは再現しない。ステップ12着手時に題材を学習者と相談する(先回りして解説はしない)。
  - `App.test.tsx`実行時に本物のNager.Dateへ通信が発生している問題を説明し、学習者の選択で「今やる」ことに決定。`fetchHolidays`を`App`のpropsで注入する形に変更するため、`AppProps`にTODO(human)を設置。
  - 学習者が`AppProps`に`fetchHolidays: (year: number) => Promise<readonly Holiday[]>`(関数型を直接記述)を追加し、`import`側を消して名前衝突を解消。依存配列は`[]`のままで`exhaustive-deps`警告が残っている。
  - Claudeが配線: `main.tsx`でモジュールスコープの`fetchHolidays`をそのまま渡す(参照が安定)。`App.test.tsx`に固定の祝日(`2026-11-03` 文化の日)を返す`fakeFetchHolidays`を用意し、`initialTodos`の「牛乳を買う」の期限日をその日に変更。テスト中の本物への通信は解消(14件通過)。
  - 祝日名表示のテストをTODO(human)として依頼、あわせて依存配列の修正を依頼。
  - 学習者が依存配列を`[fetchHolidays]`に修正し、「期限日が祝日のTodoに祝日名が表示される」テストを`closest("li")`+`within(...).findByText(/文化の日/)`で実装。偽物の祝日一覧を一時的に空にしてテストが失敗することを確認(テストが実際に検知力を持つことの検証)。typecheck/lint/format/test(15件)通過。
  - 概念の言語化で、当初「holidaysをuseStateにしないのは非同期・外部APIでエラー時も壊れないため」と説明したため、壊れない理由は状態の分離と`[]`既定値であること、導出値を状態にすると同じ情報を2か所に持つことを問いかけ、学習者が正しく言い直した。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): JS由来: `if`ブロック内の`const`がブロックスコープ外で参照できない。設計由来: 祝日の`date`を`dueDate`に合わせて安易に`.nullable()`にした(null同士の一致で期限なしTodoが祝日扱いになる危険)、`findHoliday`内で`fetchHolidays`を呼ぶ非純粋関数にした。いずれも問いかけで自力修正。
- 新しく理解したReactの概念: (1) 状態から導けるもの(`holidays`)は`useState`にせず描画のたびに計算する — 同じ情報を2か所に持つと同期ずれのバグの原因になるため、状態は最小限にする。(2) 独立して失敗しうる非同期データは別の状態に分けると、片方の失敗が画面全体を壊さない。(3) 判定ロジックを純粋関数に切り出すと通信なしで同期的にテストできる。(4) 外部依存(祝日取得関数)もpropsで注入すればテストで偽物に差し替えられる(10-aの応用)。Zod面では`.nullable()`は「キー必須・値はnull可」。
- 次回やること: ステップ12(CORS)。Nager.DateではCORSが再現しないため、題材を学習者と相談する。任意課題: 祝日取得年のハードコード解消、祝日取得失敗の表示、issue #23。

## 2026-09-27

- マイルストーン / ステップ: 第3マイルストーン / 12. CORSに当たる → Viteのproxyで回避(完了)
- やったこと:
  - セッション開始時に`learning-plan.md`/`work-log.md`を読み込み、ステップ11完了時点からの再開であることを確認。
  - 前回の申し送り(Nager.DateはCORSを許可しており計画書の「CORSに当たる」が再現しない)を受け、代わりの題材を`curl -I -H "Origin: http://localhost:5173"`で調査。
    - 内閣府の祝日CSV(`https://www8.cao.go.jp/chosei/shukujitsu/syukujitsu.csv`): `access-control-allow-origin`ヘッダなし → ブラウザから直接fetchすれば本物のCORSエラーになる。Shift_JIS、日付は`2027/11/3`形式(ゼロ埋めなし)、1955年〜翌年まで収録。
    - `holidays-jp.github.io`: `access-control-allow-origin: *`あり → 題材にならない。
  - 学習者に3案と所要時間の見積もりを提示: A. 内閣府CSVに切り替え(3〜4h、Shift_JIS解読+CSV→`Holiday`変換の純粋関数を含む)/ B. CSVをCORS実験用に追加で叩くだけ(2〜2.5h)/ C. 自前の別ポートサーバ(2〜2.5h)。ClaudeはA推奨(ステップ13のビルド時埋め込み・ステップ14の同一オリジン配信が「実際に必要な対応」になるため)。
  - 学習者の「AにするとNager.Dateが無駄になるか」という質問に対し、変わるのは`fetchHolidays`の中身だけで、`HolidaySchema`/`findHoliday`/`App`の祝日状態/propsによる注入/表示はそのまま使えること、Nager.Dateの実装は残して並べておけること、CORSの対比材料として有用であることを説明。
  - 学習者の判断で、AをB(ステップ12)と+α(ステップ12-a)に分割して進めることに決定。
    - ステップ12: 内閣府CSVでCORSエラーを体験し、Viteのproxyで取得できるところまで(2〜2.5h)。CSVの中身は使わない。
    - ステップ12-a: Shift_JISのCSVを`Holiday[]`に変換する純粋関数(学習者)+テスト、Nager.Date実装と並べて`main.tsx`で注入する関数を差し替え(1〜1.5h)。
  - `learning-plan.md`を更新: 第3マイルストーンの表に12-aを追加し、12の題材と目安を変更(第3マイルストーンの目安を4〜6h→5〜7hに)、題材変更の理由と12/12-aの進め方の注意を追記。
  - `work-log.md`の進捗サマリー表に12-aを追加。
  - GitHub issue: #17(ステップ12)の本文を題材変更に合わせて更新し、ステップ12-aのissue(#24)を#17のsub-issueとして作成。
  - 計画書・work-logの更新を`b73fd3d`でcommit/push。
  - ステップ12の実装: 計画書の方針どおり回避策を先に与えず、`holidays.ts`に`fetchCaoHolidaysCsv()`の枠(TODO(human))、`main.tsx`のトップレベルに実験用の呼び出し(成功時は文字数と先頭100文字、失敗時はエラーをconsole出力。ステップ12-aで削除予定)を用意。React由来の要因を排除するため`useEffect`ではなくトップレベルに置いた。
  - 学習者が`fetchCaoHolidaysCsv()`を`fetchHolidays`と同じ流れ(`response.ok`チェック+`response.text()`)で実装し、内閣府CSVのURLを直接fetch。ブラウザ(Firefox)で「クロスオリジン要求をブロックしました…(理由: CORS ヘッダー 'Access-Control-Allow-Origin' が足りない)。ステータスコード: 200」と`TypeError: NetworkError`が出ることを確認(本物のCORSエラーを体験)。
  - エラーメッセージの読み方を対話: ステータス200=サーバは正常に返している、JSにはCORSでもネットワーク断でも同じ`TypeError`しか渡らない、`curl`では取れる、の3点を示し、「誰がいつ止めたか」「curlとブラウザの違い」を問いかけ。学習者は「ブラウザが止めた」「`access-control-allow-origin`の有無」と回答。止めるタイミングは送信時ではなくレスポンス受信後(JSへ中身を渡すのを拒否)と補足し、同一オリジンポリシーとCORSが「ブラウザの利用者(Cookie・社内ネットワーク到達性)を守るためのブラウザ側のルール」であることを説明。
  - 回避策を問いかけ、学習者が「ブラウザが直接取りに行かず、誰かに代わりに取りに行かせてデータだけ受け取る」とproxyの発想に自力で到達。
  - Claudeが`vite.config.ts`に`server.proxy`を設定(`/api/cao`→`https://www8.cao.go.jp`、`changeOrigin: true`、`rewrite`で目印の`/api/cao`を除去)。proxyは`npm run dev`の開発サーバ内にしか存在せず、ステップ13(ビルド時埋め込み)・14(nginxで同じ代理)につながる点を補足。
  - 学習者が`CAO_CSV_URL`を相対パス`/api/cao/chosei/shukujitsu/syukujitsu.csv`に書き換え、ブラウザで取得成功を確認。Networkタブで宛先が`localhost`になっていること、レスポンスに`access-control-allow-origin`が無いのに成功していること(同一オリジンなのでCORSの確認自体が行われない)を確認。
  - typecheck/lint/format/test(15件)通過。`db.json`のフォーマット崩れ(CRUD操作由来)も合わせて修正。
  - 学習者が完了条件の2点(なぜブラウザだけが怒られるのか / proxyで何が変わったのか)を自分の言葉で正確に説明。ステップ12完了。
- 詰まった点(TS由来 / React由来 / JS由来 / 環境由来): 環境由来(CORS)のエラーを意図的に発生させた。詰まりではなく、学習者は問いかけに沿ってproxyの発想まで自力で到達。細部の補足として、ブラウザが止めるのは送信時ではなくレスポンス受信後であること。
- 新しく理解した概念(学習者の言葉): (1) CORSでブラウザだけが怒られるのは、ブラウザがCookieなどのログイン状態を保持している場合があり、悪意のある攻撃から守るため。curlにはログイン状態の保持などがないためチェックの必要がない。(2) proxyを入れると、ブラウザからは同一オリジンのViteとやり取りしているだけに見える。実際にはViteが内閣府CSVとやり取りしデータを中継している。(3) 外部APIを扱うときは`access-control-allow-origin`を確認し、あれば特別な処理なくfetchでき、なければproxyなどで回避する。Claudeの補足: 値が特定オリジン指定の場合もあるため「自分のオリジンが許可されているか」で判断する / proxyは開発サーバ内にしか無く本番では別の手段(ステップ13・14)が必要。
- 次回やること: ステップ12-a(#24)。`response.text()`はUTF-8として読むためShift_JISのCSVが文字化けしている。Shift_JISでのデコード(Claude)→CSVを`Holiday[]`に変換する純粋関数とテスト(学習者)→Nager.Date実装と並べて`main.tsx`で注入する関数を差し替え、`main.tsx`の実験用呼び出しを削除。
