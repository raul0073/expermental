import { ITable, TableAPIType } from "@/lib/Types/Table";

export async function getEPLTableService(): Promise<ITable[] | undefined> {
    try {
        const res = await fetch('http://localhost:3000/api/epl/table')
        const data: TableAPIType = await res.json();
        const tableData = data.table
        return tableData;
    } catch (error) {
        console.error(error);
    }
}