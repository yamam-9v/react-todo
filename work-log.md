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
ステップ2(パラダイムの違いの言語化)完了。「グローバルGameState+rAFポーリング」から「コンポーネントごとのuseState+イベント駆動の自動再レンダリング」への転換を学習者が自分の言葉で説明できることを確認済み。
ステップ3(useStateとpropsでハードコード配列を表示)完了。`Todo`型、`TodoItemProps`型を学習者が定義し、`key`の役割(要素の同一性の保持)を正しく言語化できることを確認済み。
ステップ4(追加・削除・完了トグル)完了。`src/todoOperations.ts`に`toggleTodo`/`removeTodo`/`addTodo`の3つの純粋関数を実装済み。`App.tsx`(useState<readonly Todo[]>、setTodos、各ハンドラ、追加フォーム)と`TodoItem.tsx`(onToggle/onRemove props、チェックボックスのonChange、削除ボタン)の配線はClaudeが実装。ブラウザでの動作確認(トグル/削除/追加/最後の1件の削除)まで完了。
ステップ5(コンポーネント分割)完了。`App.tsx`を`AddTodoForm.tsx`(追加フォーム)と`TodoList.tsx`(一覧表示)に分割し、`todos`stateは`App`のみが持つ設計にした。
ステップ6(useEffect初体験 — localStorage永続化)完了。ts-tetrisの`loadFromStorage<T>`を`src/storage.ts`に移植(型ガード`isValidTodos`/`isValidTodo`、`loadFromStorage`、`saveToStorage`)。`App.tsx`は`useState`の初期化関数で起動時に一度だけlocalStorageを読み込み(なければ`initialTodos`にフォールバック)、`useEffect(() => { saveToStorage(...) }, [todos])`で`todos`が変わるたびに書き込む設計にした。
GitHub issueでの進捗管理を開始(マイルストーン0〜4を親issue、ステップ1〜16を子issueとしてSub-issues機能で紐付け。完了済みのマイルストーン0・1とステップ1〜6はclose、ステップ7以降はopenのまま)。
ステップ7(json-server導入 + TodoRepositoryインターフェース設計)完了。json-server(v1 beta)を導入し`db.json`(初期3件)と`npm run server`(port 3001)を用意。`src/todoRepository.ts`に`TodoRepository`インターフェース(list/create/update/remove)と入力用の`TodoInput`型を学習者が定義。次回はステップ8(fetchによるCRUDと3状態の判別可能ユニオン、issue #13)に着手する。

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
