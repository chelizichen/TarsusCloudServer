import query from "../../routes/main/db/query";
import {result, size} from "lodash";
import { PrimaryRepoInst } from "../define";

type SelectConfig = {
    offset:string;
    size:string;
    searchFields:Array<{keyword:string,value:string}>;
    descConfig:{filed:string;type:"desc"|"asc"};
}


interface DBManager{
    queryStruct(tableName:string):any[];
    queryTables():any[]
    selectData(tableName:string,selectConfig:SelectConfig):any[];
    saveData(tableName:string,record:Record<string, string>):any;
    updateData(tableName:string,record:Record<string, string>,id:string):any;
    deleteData(tableName:string,record:Record<string, string>):any;
    execute(sql:string)
}

class TarsusDBManager implements DBManager{
    public PrimaryRepo:typeof PrimaryRepoInst;
    
    constructor(){
        this.PrimaryRepo = PrimaryRepoInst;
    }
    execute(sql: string) {
    }

    queryStruct(tableName: string): any[] {
        return [];
    }

    queryTables(): any[] {
        return [];
    }

    selectData(tableName: string, selectConfig: SelectConfig) {
        // 提供默认值
        const { offset = '0', size = '100', searchFields, descConfig } = selectConfig;

        // 构建查询语句
        let query = `SELECT * FROM ${tableName}`;

        // 处理搜索条件
        if (searchFields && searchFields.length > 0) {
            const conditions = searchFields.map((field) => {
                return `${field.keyword} = '${field.value}'`;
            });
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        // 处理排序
        if (descConfig) {
            query += ` ORDER BY ${descConfig.filed} ${descConfig.type}`;
        }

        // 处理分页
        query += ` LIMIT ${size} OFFSET ${offset}`;

        // 模拟执行查询
        const result = {
            query: query, // 查询语句（仅用于演示）
            data: [] // 查询结果数据（根据实际情况填充）
        };

        console.log('执行查询：', result.query);
        console.log('查询结果：', result.data);

        return result.data;
    }

    deleteData(tableName: string, record: Record<string, string>): any {
        // 构建删除数据的 SQL 语句
        const conditions = Object.entries(record).map(([key, value]) => `${key} = '${value}'`).join(' AND ');
        const sql = `DELETE FROM ${tableName} WHERE ${conditions};`;

        // 返回 SQL 语句
        return sql;
    }

    saveData(tableName: string, record: Record<string, string>): any {
        // 构建插入数据的 SQL 语句
        const columns = Object.keys(record).join(', ');
        const values = Object.values(record).map(value => `'${value}'`).join(', ');
        const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;

        // 返回 SQL 语句
        return sql;
    }

    updateData(tableName: string, record: Record<string, string>, id: string): any {
        const updates = Object.entries(record).map(([key, value]) => `${key} = '${value}'`).join(', ');
        const sql = `UPDATE ${tableName} SET ${updates} WHERE id = '${id}';`;

        // 返回 SQL 语句
        return sql;
    }

}