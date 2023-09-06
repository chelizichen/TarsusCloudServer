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




export const node_configs:node_config[] = [
    // 主控需要端口隔离
    {
        port:3401,
        config:{
            isPrimary:true,
            stats:nodeStats.died,
            logger:true
        }
    },
    {
        port:3411,
        config:{
            isPrimary:false,
            stats:nodeStats.died,
            user_dirs:"api",
            user_id:"1"
        }
    },
    {
        port:3412,
        config:{
            isPrimary:false,
            stats:nodeStats.died,
            user_dirs:"api1",
            user_id:"2"
        }
    }
]

export async function reset_node(port:number){
    const config = node_configs.find(item=>item.port == port)
    if (!config) {
        console.error("Config not found fo  r port:", port);
        return;
    }
    try{
        const server = Fastify({ logger: config.config.logger });
        await server.register(loadAll);
        await server.listen({ port: config.port });
        console.log("监听port", config.port, "成功");

        // 父向子传递重启信息，子告诉父需要重启信息，并且自动断开
        process.on('message',function(msg){
            if(msg == "reset"){
                const sendToPrimary = {
                    stats:nodeStats.starting,
                    port:port
                }
                // 强制重启
                process.send(sendToPrimary,function(){
                    process.exitCode = nodeStats.exit
                    process.exit()
                })
            }
        })
    }catch(e){
        console.error("Error in reset_node for port:", port, e);
    }
}