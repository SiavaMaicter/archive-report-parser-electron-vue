import { table } from 'console';
import { app } from 'electron'
import fs from 'fs'
import ExcelJS from 'exceljs'
const default_directory = app.getAppPath();
const default_file = default_directory + "\\data\\111.txt"

export const file_parser = {
    get_file_content: async () => {
        let default_file_content;
        if (fs.existsSync(default_file)) {
            default_file_content = await fs.readFileSync(default_file, 'utf-8');
        } else {
            throw new Error("FILE NOT EXIST")
        }
        const lines = default_file_content.split("\n");
        const tableData = [];
        const header = lines[0].trim().split(/\s+/);
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                const columns = line.split(/\s+/);
                let mergedObject = {};
                for (let i = 0; i < header.length; i++) {
                    mergedObject[header[i]] = columns[i];
                }
                tableData.push(mergedObject)
            }
        }
        // console.log(tableData)
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('fasdfasf');
        worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
        worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });
        await workbook.xlsx.writeFile(default_directory + '\\data\\test.xlsx');
        return tableData.reverse();
    },
    create_excele_file: async (report, heatbase) => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(heatbase.name);
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Status', key: 'status', width: 15 }
        ];
        const row = worksheet.getRow(1);
        row.getCell("A").value = 1;
        row.getCell("B").value = 'test';
        row.getCell("C").value = 'some_value';
        worksheet.addRow({ id: 1, name: 'Task 1', status: 'approved' });
        worksheet.addRow({ id: 2, name: 'Task 2', status: 'denied' });
        await workbook.xlsx.writeFile(default_directory + '\\test.xlsx');
    }
}