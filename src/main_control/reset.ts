import Fastify from "fastify";
import loadAll from "./server";
import {node_config} from "./define";

export enum nodeStats{
    alive,
    died,
    starting = 30,
    exit = 40,
    showdown = 41
}





export async function reset_node(config:node_config){
    if (!config) {
        console.error("Config not found fo  r port:", config.port);
        return;
    }
    try{
        const server = Fastify({ logger: config.is_primary });
        await server.register(loadAll);
        await server.listen({ port: config.port });
        console.log("监听port", config.port, "成功");

        // 父向子传递重启信息，子告诉父需要重启信息，并且自动断开
        process.on('message',function(msg){
            if(msg == "reset"){
                const sendToPrimary = {
                    stats:nodeStats.starting,
                    port:config.port
                }
                // 强制重启
                process.send(sendToPrimary,function(){
                    process.exitCode = nodeStats.exit
                    process.exit()
                })
            }
        })
    }catch(e){
        console.error("Error in reset_node for port:", config.port, e);
    }
}