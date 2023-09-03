import path from "path";
// define routes path
const routes_path = path.resolve(__dirname, "routes")
process.env.routes_path = routes_path;
process.env.IsProd = '0';
import server from "./main_control/server";
// 集群模块
import Fastify, {FastifyInstance} from "fastify";
import loadAll from "./main_control/server";

/**
 * @description
 * serverless 主控函数启动器
 */

const startServer = async () => {
    const server = Fastify({logger: true});
    server.get('/some-dynamic-route', async (request, reply) => {
        return { hello: 'world' };
    });
    await server.register(loadAll)
    await server.listen({
        port: 3000
    });

};

startServer()
