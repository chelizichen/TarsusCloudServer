import * as fs from "fs";
import path from "path";
import server from "./server";

const cwd: string = process.cwd();

async function LoadRoutes(...routes_path: string[]) {
    const files_routes = path.resolve(cwd, ...routes_path);
    const dirs = fs.readdirSync(files_routes)
    for (let dir of dirs) {
        const route = dir.replace(".ts", "")

        const file_path = path.resolve(files_routes, dir)
        const file_export_func = await import(file_path)
        const routes_args = file_export_func.default();
        server.get("/" + route, routes_args[0], routes_args[1])
        // import(dir).then(service=>{
        //     service(route_path)
        // })
    }
}

export default LoadRoutes