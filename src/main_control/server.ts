import fastifyMultipart from "@fastify/multipart";
import load_static from "../static/load_static";
import load_routes from "./serverless";
import load_main from "./main_api";
import path from "path";
import {PathType} from "./define";



async function loadAll(server){
    server.register(fastifyMultipart);
    const config = JSON.parse(process.env.fastify_config)
    load_static(server);
    load_main(server);

    if(config.isPrimary){
        const main_path = path.resolve(process.env.routes_path,PathType.main)
        await load_routes(server,main_path)

    }else{
        const worker_path = path.resolve(process.env.routes_path,PathType.work)
        await load_routes(server,worker_path)
    }

}

export default loadAll;




