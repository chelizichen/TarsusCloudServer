import fastifyMultipart from "@fastify/multipart";
import patch_func from "../patch/patch_func";
import load_static from "../static/load_static";
import load_routes from "./serverless";

async function loadAll(server){
    server.register(fastifyMultipart);
    const config = JSON.parse(process.env.fastify_config)
    if(config.isPrimary){
        patch_func(server);
        load_static(server);
    }else{
        await load_routes(server,process.env.routes_path)
    }

}

export default loadAll;




