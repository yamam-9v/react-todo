import bundled from "./generated/holidays.json";
import type { Holiday } from "./holidays";

// GitHub Pages(デモ用ビルド)向け。scripts/generate-holidays.ts が書き出した祝日データを
// バンドルに埋め込み、通信せずに返す。
// fetchHolidays / fetchCaoHolidays と同じ型にそろえ、main.tsx で差し替えられるようにする。
// (holidays.ts ではなく別ファイルにしているのは、生成スクリプトが holidays.ts を import するため。
//  同じファイルに置くと「JSON を作るスクリプトが、まだ無い JSON を import する」ことになる)
export function getBundledHolidays(year: number): Promise<readonly Holiday[]> {
  const holidays = bundled.filter((holiday) =>
    holiday.date.startsWith(`${year}-`),
  );
  return Promise.resolve(holidays);
}
