import { table } from 'console';
import { app } from 'electron'
import fs from 'fs'
import ExcelJS from 'exceljs'
import { report_keys, headerStyle, descriptionStyle, tableHeaderStyle, tableStyle } from './report-utils.js';
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
        const reg_date = /^([0-2]\d|3[01])\/(0\d|1[0-2])\/\d{4}\s([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
        // const header = lines[0].match(/[^\t]+(?=\t| {2,}|$)/g);    //для получения полного заголовка таблицы
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            // console.log(line)
            if (line) {
                const columns = line.match(/[^\t]+(?=\t| {2,}|$)/g);
                let mergedObject = {};
                Object.entries(report_keys).forEach(([key, value]) => {
                    mergedObject[value.translated] = reg_date.test(columns[key]) ? columns[key] : parseFloat(columns[key]);
                });
                tableData.push(mergedObject)
            }
        }
        tableData.reverse();

        return tableData;
    },
    create_excele_file: async (report, heatbase) => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet(heatbase.name);
        sheet.mergeCells('A1', 'I2');
        console.log();
        sheet.getCell('A1').value = `Суточный период с ${report[0]['Начало даты']} по ${report[report.length - 1]['Конец даты']}`;
        sheet.getCell('A1').style = headerStyle;
        sheet.mergeCells('A3', 'B3');
        sheet.mergeCells('A4', 'B4');
        sheet.mergeCells('A5', 'B5');
        sheet.mergeCells('E4', 'F4');
        sheet.getCell('A3').value = `Объект`;
        sheet.getCell('A4').value = `Корректор`;
        sheet.getCell('A5').value = `Газовое хозяйство`;
        sheet.getCell('C3').value = heatbase.name;
        sheet.getCell('C4').value = `Corus`;
        sheet.getCell('C5').value = `ТТГ`;
        sheet.getCell('A3').style = descriptionStyle;
        sheet.getCell('A4').style = descriptionStyle;
        sheet.getCell('A5').style = descriptionStyle;
        sheet.getCell('C3').style = descriptionStyle;
        sheet.getCell('C4').style = descriptionStyle;
        sheet.getCell('C5').style = descriptionStyle;
        let headerKeys = Object.keys(report[0]);
        headerKeys.unshift("№ ")
        sheet.addRow(headerKeys)
        sheet.lastRow.eachCell((cell, collNum) => {
            cell.style = tableHeaderStyle;
        })
        // sheet.lastRow.style = tableHeaderStyle;
        const firstTableRow = sheet.rowCount + 1;
        report.forEach((row, index) => {
            row[0] = index + 1
            sheet.addRow(Object.values(row));
            // sheet.lastRow.style = tableStyle;
            sheet.lastRow.eachCell((cell, collNum) => {
                cell.style = tableStyle;
                // cell.type = ExcelJS.ValueType.Number
            })
        })
        const lastTableRow = sheet.rowCount
        sheet.addRow();
        let lastRow = sheet.lastRow
        sheet.mergeCells(`A${sheet.rowCount}`, `B${sheet.rowCount}`)
        lastRow.getCell(1).value = 'Среднее за период:'
        lastRow.getCell(4).value = { formula: `=SUM($D$${firstTableRow}:$D$${lastTableRow})/${lastTableRow - firstTableRow}` }
        lastRow.getCell(5).value = { formula: `=SUM($E$${firstTableRow}:$E$${lastTableRow})/${lastTableRow - firstTableRow}` }
        lastRow.getCell(6).value = { formula: `=SUM($F$${firstTableRow}:$F$${lastTableRow})/${lastTableRow - firstTableRow}` }
        lastRow.getCell(7).value = { formula: `=SUM($G$${firstTableRow}:$G$${lastTableRow})/${lastTableRow - firstTableRow}` }
        lastRow.eachCell((cell, collNum) => {
            cell.style = descriptionStyle;
        })
        sheet.addRow();
        lastRow = sheet.lastRow
        sheet.mergeCells(`A${sheet.rowCount}`, `B${sheet.rowCount}`)
        lastRow.getCell(1).value = 'Итого за период:'
        lastRow.getCell(4).value = { formula: `=SUM($D$${firstTableRow}:$D$${lastTableRow})` }
        lastRow.getCell(5).value = { formula: `=SUM($E$${firstTableRow}:$E$${lastTableRow})` }
        lastRow.getCell(6).value = { formula: `=SUM($F$${firstTableRow}:$F$${lastTableRow})` }
        lastRow.getCell(7).value = { formula: `=SUM($G$${firstTableRow}:$G$${lastTableRow})` }
        lastRow.eachCell((cell, collNum) => {
            cell.style = descriptionStyle;
        })
        // sheet.getRow(sheet.rowCount).style = descriptionStyle;
        await workbook.xlsx.writeFile(default_directory + `\\data\\${heatbase.name}.xlsx`);
        console.log(`Excel file created: ${heatbase.name}.xlsx`);
    }
}