import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import path from "path";
import fs from "fs";
import {Reply, ReplyBody} from "./define";


function load_main(server:FastifyInstance){
    // 拿到当前目录
    const routes = process.env.routes_path;

    // 用户查看自己所拥有的函数目录
    server.get('/api/*', async (request: FastifyRequest, reply: FastifyReply) => {
        const request_url = request.url
        const dir = path.join(routes, request_url)
        if (request.url.endsWith(".js") || request.url.endsWith(".ts") || request.url.endsWith(".map")) {
            const file = fs.readFileSync(dir, "utf-8")
            reply.send(Reply(ReplyBody.success,ReplyBody.success_message,{
                content:file
            }))
        } else {
            const dirs = readDir(dir);
            reply.send(Reply(ReplyBody.success,ReplyBody.success_message,{
                dirs:dirs
            }))
        }
    })


}

function readDir(dir, parent = '') {
    const items = fs.readdirSync(dir);
    return items.map(item => {
        const fullPath = path.join(dir, item);
        const relPath = path.join(parent, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            return {type: 'folder', name: item, path: relPath, children: readDir(fullPath, relPath)};
        } else {
            return {type: 'file', name: item, path: relPath};
        }
    });
}
export default load_main;