import { describe, it, expect } from "vitest";
import { parseCaoHolidaysCsv, type Holiday } from "./holidays";

// 内閣府CSVの実データと同じ形(ヘッダ行あり・CRLF・末尾に改行あり)
const HEADER = "国民の祝日・休日月日,国民の祝日・休日名称";

describe("parseCaoHolidaysCsv", () => {
  it("正常なCSVを読み込むと Holiday[] を返す", () => {
    const csv = `${HEADER}\r\n1955/1/1,元旦\r\n2027/11/3,文化の日\r\n`;
    const holidays: Holiday[] = [
      {
        date: "1955-01-01",
        localName: "元旦",
      },
      {
        date: "2027-11-03",
        localName: "文化の日",
      },
    ];

    expect(parseCaoHolidaysCsv(csv)).toEqual(holidays);
  });
  it("異状なCSV (不正なデータ) を読み込むとエラーを吐く", () => {
    const csv = `${HEADER}\r\n不明な祝日\r\n2027/11/3,文化の日\r\n`;
    expect(() => parseCaoHolidaysCsv(csv)).toThrow();
  });
  it("異状なCSV (データ末尾に余分な改行) を読み込むとエラーを吐く", () => {
    const csv = `${HEADER}\r\n1955/1/1,元旦\r\n2027/11/3,文化の日\r\n\r\n`;
    expect(() => parseCaoHolidaysCsv(csv)).toThrow();
  });
});
