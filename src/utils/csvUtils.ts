import fs from "fs";
import { parse } from "csv-parse/sync";

export class CsvHelper {
    static readCsv(filePath: string): Record<string, string>[] {
        if (!filePath || typeof filePath !== "string") {
            throw new Error("A valid CSV file path is required.");
        }

        const csvContent = fs.readFileSync(filePath, "utf-8");

        if (!csvContent.trim()) {
            return [];
        }

        const rows = parse(csvContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
            bom: true,
            relax_column_count: true,
        }) as Array<Record<string, string | undefined>>;

        return rows.map((row) =>
            Object.fromEntries(
                Object.entries(row).map(([key, value]) => [
                    key.trim(),
                    String(value ?? "").trim(),
                ])
            )
        );
    }
}