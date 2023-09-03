import {FastifyInstance} from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";

const cwd = process.cwd();
function load_static(server:FastifyInstance){
    server.register((fastifyStatic), {
        root: path.resolve(cwd, 'public'),
        prefix: '/static/',
    });
}

export default load_static