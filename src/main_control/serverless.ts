import * as fs from "fs";
import path from "path";
import {FastifyInstance, RouteShorthandOptions} from "fastify";

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
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            // 如果为目录，则为该目录提供一个接口，可以通过该目录去上传文件
            // TODO：后期提供用户私域的功能
            await load_routes(server,filePath, `${prefix}/${file}`);
            const routes = process.env.routes_path
            server.route({
                method:"POST",
                url:dir,
                handler:async function(request,reply){
                    const data = await request.file();
                    const fileContent = await data.toBuffer();
                    const originalFilename = data.filename;
                    const file_path = path.resolve(routes,originalFilename)
            
                    fs.writeFileSync(file_path,fileContent)
            
                    return { uploaded: true };
                }
            })
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