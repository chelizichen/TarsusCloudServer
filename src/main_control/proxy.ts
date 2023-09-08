import {FastifyInstance} from "fastify";
const proxy = require('fastify-http-proxy');
import {centerControl} from "./define";

let proxyPorts = [];

async function updateProxyPorts() {
    proxyPorts = await centerControl.getWorkers();
}

// 定期更新工作节点端口列表
setInterval(updateProxyPorts, 60000); // 每分钟更新一次
function load_proxy(server:FastifyInstance){
    server.register(proxy, {
        upstream: 'http://localhost:3411', // 默认的上游地址，但我们会在 preHandler 中动态更改它
        prefix: '/api',
        http2: false,
        preHandler: async (request, reply) => {
            // 选择一个工作节点端口
            const targetPort = proxyPorts[Math.floor(Math.random() * proxyPorts.length)];
            request.upstreamAddress = `http://localhost:${targetPort}`;
        }
    });
}
