import {FastifyReply, FastifyRequest} from "fastify";
import http from "../static/http_request";
import {OutTimeError} from "./error";

function load_proxy(server: any) {
    server.route({
        method: 'POST',
        url: '/proxy/*',
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const targetUrl = request.url.replace("/proxy", "");
            const targetPort = request.headers['x-target-port'];
            const target = `http://localhost:${targetPort}${targetUrl}`
            try{
                const data = await http({
                    url:target,
                    method:"post",
                    data:request.body
                })
                reply.send(data)
            }catch (e){
                throw OutTimeError()
            }

        }
    });
}

export default load_proxy;
