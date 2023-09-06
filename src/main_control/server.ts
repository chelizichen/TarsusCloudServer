import fastifyMultipart from "@fastify/multipart";
import load_static from "../static/load_static";
import load_routes from "./serverless";
import load_main from "./main_api";
import path from "path";
import {node_config, PathType} from "./define";



async function loadAll(server){
    server.register(fastifyMultipart);
    const config:node_config = JSON.parse(process.env.fastify_config)
    load_static(server);
    load_main(server);

    if(Number(config.is_primary)){
        const main_path = path.resolve(process.env.routes_path,PathType.main)
        await load_routes(server,main_path,"/main")
    }else{
        debugger;
        const user_path = process.env.user_path
        const worker_path = path.resolve(process.env.routes_path,"api",user_path)
        console.log('worker will start to resolve at ',worker_path)
        try{
            await load_routes(server,worker_path,"/"+user_path)
        }catch (e){
            console.log(e)
        }
    }

}

export default loadAll;




