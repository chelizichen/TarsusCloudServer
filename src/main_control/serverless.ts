import * as fs from "fs";
import path from "path";
import {FastifyInstance, RouteShorthandOptions} from "fastify";
import {node_config} from "./define";


let suffix = process.env.suffix
console.log('suffix',suffix);


async function load_routes(server:FastifyInstance,dir, prefix = '') {
    console.log('load_routes',dir,prefix);
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            await load_routes(server,filePath, `${prefix}/${file}`);
        } else if (stat.isFile() && (filePath.endsWith(suffix)) ) {
            try{
                const config:node_config = JSON.parse(process.env.fastify_config)
                const isPrimary = config.is_primary
                if(Number(isPrimary)){
                    const file_path = path.resolve(dir,file)
                    const route = await import(file_path);
                    const [opts, handler]:any[]=  await route.default.default();
                    const routePath = `${prefix}/${path.basename(file, suffix)}`;
                    console.log(routePath + ' is load success')
                    server.route({
                        method: 'POST',
                        url: routePath,
                        ...opts,
                        handler
                    });
                }else {
                    const file_path = path.resolve(dir,file)
                    console.log('file_path',file_path)
                    const route = import(file_path);
                    route.then(res=>{
                        console.log('res',res);
                        const [opts, handler]:any[]= res.default.default;
                        const routePath = `${prefix}/${path.basename(file, suffix)}`;
                        console.log(routePath + ' is load success')
                        server.route({
                            method: 'POST',
                            url: routePath,
                            ...opts,
                            handler
                        });
                    })
                }

            }catch (e){
                console.log(e)
            }
        }
    }
}

export default load_routes;