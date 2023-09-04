import * as fs from "fs";
import path from "path";
import {FastifyInstance, RouteShorthandOptions} from "fastify";
import {RouteHandlerMethod} from "fastify/types/route";

// 环境定义
console.log('process.env.IsProd',process.env.IsProd)

let suffix = ""
if(process.env.IsProd == "1"){
    suffix = ".js"
}else {
    suffix = ".ts"
}


async function load_routes(server:FastifyInstance,dir, prefix = '') {
    const files = fs.readdirSync(dir);
    console.log(666)
    debugger
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            await load_routes(server,filePath, `${prefix}/${file}`);
        } else if (stat.isFile() && (filePath.endsWith(suffix)) ) {
            try{
                const file_path = path.resolve(dir,file)
                const route = await import(file_path);
                const [opts, handler]:any[]=  route.default();
                const routePath = `${prefix}/${path.basename(file, suffix)}`;
                console.log(routePath + ' is load success')
                server.route({
                    method: 'GET',
                    url: routePath,
                    ...opts,
                    handler
                });
            }catch (e){
                console.log(e)
            }
        }
    }
}

export default load_routes;