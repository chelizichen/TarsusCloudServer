import fastifyMultipart from "@fastify/multipart";
import patch_func from "../patch/patch_func";
import load_static from "../static/load_static";
import load_routes from "./serverless";

async function loadAll(server){
    server.register(fastifyMultipart);
    const config = JSON.parse(process.env.fastify_config)
    patch_func(server);
    load_static(server);
    await load_routes(server,process.env.routes_path)

    if(config.isPrimary){
    }else{
    }

}

export default loadAll;




