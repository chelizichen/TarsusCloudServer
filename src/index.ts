import Fastify, { FastifyInstance } from "fastify";
import cluster from "cluster";
import path from "path";
const routes_path = path.resolve(__dirname, "routes")
process.env.routes_path = routes_path;
process.env.IsProd = '0';
import { nodeStats, reset_node} from "./main_control/reset";
import {centerControl, node_config} from "./main_control/define";


async function startServer() {
    const primary_node:node_config = await centerControl.getPrimary();
    const worker_nodes:node_config[] = await centerControl.getWorkers();
    if(cluster.isPrimary){
        cluster.on('exit', (worker, code, signal) => {
            console.log(code);
            if(code == nodeStats.exit){
                console.log(`Worker ${worker.process.pid} will restart exit.code = 30`);
            }else{
                console.log(`Worker ${worker.process.pid} died`);
            }
        });
        // set env
        process.env.fastify_config = JSON.stringify(primary_node)

        try {
            // 单独启动主控端口后再启动其他端口
            await reset_node(primary_node);

            // for (let i = 0; i < worker_nodes.length; i++) {
            //     const fork_env:string = JSON.stringify(worker_nodes[i])
            //     cluster.fork({
            //         fastify_config:fork_env
            //     });
            // }
        } catch (e) {
            console.error("Error in primary node:", e);
        }

        cluster.on('message',function(worker, message, handle){
            const {port,stats} = message;
            
            if(port && stats){
                console.log('primary node on message',message);
                if(stats == nodeStats.starting && port){
                    const node_config:node_config = worker_nodes.find(item=>item.port == port)
                    console.log("restart server at port:",node_config.port);
                    reset_node(node_config)
                }
            }
        })



    }else{
        const config = process.env.fastify_config;
        if (!config) {
            console.error("fastify_config not found in environment variables");
            return;
        }
        const worker_env:node_config = JSON.parse(config);
        await centerControl.setPid(worker_env.user_id,process.pid)
        process.env.user_path =  worker_env.dir
        console.log( process.env.user_path)
        try {
            await reset_node(worker_env);
        } catch (e) {
            console.error("Error in worker node:", e);
        }
        process.on("message",function (message:string){
            if(message == "shutdown"){
                process.exit(nodeStats.showdown)
            }
        })
    }
}

startServer().catch(e => console.error("Error in startServer:", e));