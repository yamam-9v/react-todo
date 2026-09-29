import { z } from "zod";

// Nager.Date API のレスポンス例(1件分):
// {
//   "date": "2026-01-01",
//   "localName": "元日",
//   "name": "New Year's Day",
//   "countryCode": "JP",
//   "fixed": false,
//   "global": true,
//   "counties": null,
//   "launchYear": null,
//   "types": ["Public"]
// }
export const HolidaySchema = z.object({
  date: z.iso.date(),
  localName: z.string().min(1),
});

export type Holiday = z.infer<typeof HolidaySchema>;

const HolidayListSchema = z.array(HolidaySchema);

const BASE_URL = "https://date.nager.at/api/v3/PublicHolidays";

export async function fetchHolidays(year: number): Promise<readonly Holiday[]> {
  const response = await fetch(`${BASE_URL}/${year}/JP`);
  if (!response.ok) {
    throw new Error(
      `祝日データの取得に失敗しました: ${response.status} ${response.statusText}`,
    );
  }
  const data: unknown = await response.json();
  return HolidayListSchema.parse(data);
}

// 内閣府「国民の祝日」CSV(Viteのproxy経由で取得する)
// 中身の例(Shift_JIS、改行はCRLF、1955年〜翌年までの全年分):
//   国民の祝日・休日月日,国民の祝日・休日名称
//   1955/1/1,元日
//   2027/11/3,文化の日
const CAO_CSV_URL = "/api/cao/chosei/shukujitsu/syukujitsu.csv";

// url を省略するとブラウザ用(proxy経由)。scripts/generate-holidays.ts からは
// 内閣府のURLを直接渡す(Node には CORS の制約が無い)
export async function fetchCaoHolidaysCsv(url = CAO_CSV_URL): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `祝日データの取得に失敗しました: ${response.status} ${response.statusText}`,
    );
  }
  // response.text() は常にUTF-8として読むため、バイト列のまま受け取って
  // Shift_JISとしてデコードする
  const buffer = await response.arrayBuffer();
  return new TextDecoder("shift_jis").decode(buffer);
}

export function parseCaoHolidaysCsv(csv: string): Holiday[] {
  const row = csv.split("\r\n");
  const croppedRow = row.slice(1, -1);
  const splittedRow = croppedRow.map((item) => item.split(","));
  const holidays: unknown = splittedRow.map((item) => {
    if (!item[0]) return;

    const [year, month, day] = item[0].split("/");
    const padMonth = month?.padStart(2, "0");
    const padDay = day?.padStart(2, "0");

    return {
      date: `${year}-${padMonth}-${padDay}`,
      localName: item[1],
    };
  });

  return HolidayListSchema.parse(holidays);
}

// fetchHolidays(Nager.Date版)と同じ形にそろえ、main.tsx で差し替えられるようにする。
// CSVは全年分が1ファイルなので、取得後に指定年だけに絞り込む
export async function fetchCaoHolidays(
  year: number,
): Promise<readonly Holiday[]> {
  const csv = await fetchCaoHolidaysCsv();
  return parseCaoHolidaysCsv(csv).filter((holiday) =>
    holiday.date.startsWith(`${year}-`),
  );
}

export function findHoliday(
  dueDate: string,
  holidays: readonly Holiday[],
): Holiday | undefined {
  const holiday = holidays.find((item) => item.date === dueDate);
  return holiday;
}
