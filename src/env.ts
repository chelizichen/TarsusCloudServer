import { PoolOptions } from "mysql2";
import path from "path";
import dotenv from 'dotenv';

// 通过加载不同的.env文件来设置不同的环境变量
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' }); // 加载生产环境的.env文件
} else {
    dotenv.config({ path: '.env.local' }); // 加载本地环境的.env文件
}

// *************** set env
const routes_path = path.resolve(__dirname, "routes")
const taro_path = path.resolve(__dirname, "taro")
process.env.routes_path = routes_path;
process.env.taro_path = taro_path;

let poolConfig : PoolOptions = {
    user: process.env.db_user,
    password: process.env.db_password,
    port: Number(process.env.db_port),
    host: process.env.db_host,
    database: process.env.db_database,
    connectionLimit: Number(process.env.db_connectionLimit),
};

process.env.poolConfig = JSON.stringify(poolConfig)
// set env ***************

export {
    routes_path,
    taro_path
}