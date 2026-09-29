// 内閣府の祝日CSVを取得し、src/generated/holidays.json に書き出す。
// GitHub Pages には Vite の proxy が無いため、祝日データはこのJSONとしてバンドルに埋め込む。
// 祝日が追加・変更されたとき(内閣府は毎年2月頃に翌年分を公開)に手で実行して commit する:
//   npm run holidays
import { writeFile } from "node:fs/promises";
import { fetchCaoHolidaysCsv, parseCaoHolidaysCsv } from "../src/holidays.ts";

const CAO_CSV_URL = "https://www8.cao.go.jp/chosei/shukujitsu/syukujitsu.csv";
const OUTPUT_PATH = new URL("../src/generated/holidays.json", import.meta.url);

const holidays = parseCaoHolidaysCsv(await fetchCaoHolidaysCsv(CAO_CSV_URL));
await writeFile(OUTPUT_PATH, `${JSON.stringify(holidays, null, 2)}\n`);
console.log(
  `${holidays.length} 件の祝日を書き出しました: ${OUTPUT_PATH.pathname}`,
);
