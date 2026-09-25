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

export function findHoliday(
  dueDate: string,
  holidays: readonly Holiday[],
): Holiday | undefined {
  const holiday = holidays.find((item) => item.date === dueDate);
  return holiday;
}
