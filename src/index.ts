import cluster from "cluster";
import path from "path";
const routes_path = path.resolve(__dirname, "routes")
const taro_path = path.resolve(__dirname, "taro")
process.env.routes_path = routes_path;
process.env.taro_path = taro_path;
process.env.IsProd = '1';
import { nodeStats, reset_node} from "./main_control/reset";
import {centerControl, node_config} from "./main_control/define";
import stream_proxy from "./main_control/taro";
import { readdirSync, writeFileSync } from "fs";
import { cwd } from "process";
import load_schema, { generateSchemaFromMap } from "./main_control/schema";

function LoadTaro() {
        const full_path = path.resolve(cwd(), taro_path);
        const dirs      = readdirSync(full_path);
        dirs.forEach((interFace) => {
            const taro_path = path.resolve(full_path, interFace);
            stream_proxy.SetStream(taro_path);
        });
        const structMaps    = stream_proxy.TarsusStream.struct_map
        const schemaMaps    = generateSchemaFromMap(structMaps)
        const systemTaroJsFilePath = path.resolve(__dirname,'./taro','System.json')
        writeFileSync(systemTaroJsFilePath,JSON.stringify(schemaMaps),'utf-8')
        load_schema.dtoMaps = schemaMaps;
}

async function startServer() {
    const primary_node:node_config = await centerControl.getPrimary();
    const worker_nodes:node_config[] = await centerControl.getWorkers();
    if(cluster.isPrimary){
        LoadTaro()
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
        await centerControl.setPid(String(worker_env.port),process.pid)
        process.env.user_path =  worker_env.dir
        console.log( process.env.user_path)
        const taro_path = path.resolve(routes_path,'taro',process.env.user_path)
        console.log('load taro_ts_path',taro_path,' success');
        await import(taro_path)
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