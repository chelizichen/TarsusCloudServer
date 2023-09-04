import Fastify, { FastifyInstance } from "fastify";
import cluster from "cluster";
import path from "path";
const routes_path = path.resolve(__dirname, "routes")
process.env.routes_path = routes_path;
process.env.IsProd = '0';
import loadAll from "./main_control/server";

enum nodeStats{
    alive,
    died,
    starting = 30,
    exit = 40
}

type node_config = {
    port:number,
    config:{
        isPrimary:boolean,
        stats:nodeStats,
        logger?:boolean
    }
}

const node_configs:node_config[] = [
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
        port:3000,
        config:{
            isPrimary:false,
            stats:nodeStats.died
        }
    },
    {
        port:3001,
        config:{
            isPrimary:false,
            stats:nodeStats.died
        }
    }
]

function patch_node(node_config:node_config) {

}


async function reset_node(port:number){
    const config = node_configs.find(item=>item.port == port)
    
    const server = Fastify({ logger: config.config.logger });
    await server.register(loadAll)
    server.listen({
        port: config.port
    });
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
    return server
}

async function startServer() {
    const primary_node:node_config = node_configs.find(item=>item.config.isPrimary == true)
    const worker_nodes:node_config[] = node_configs.filter(item=>!item.config.isPrimary)
    if(cluster.isPrimary){
        
        for (let i = 0; i < worker_nodes.length; i++) {
            const fork_env:string = JSON.stringify(worker_nodes[i])
            cluster.fork({
                child_config:fork_env
            });
        }
        
        cluster.on('exit', (worker, code, signal) => {
            console.log(code);
            
            if(code == nodeStats.exit){
                console.log(`Worker ${worker.process.pid} will restart exit.code = 30`);
            }else{
                console.log(`Worker ${worker.process.pid} died`);
            }
        });



        reset_node(primary_node.port)

        cluster.on('message',function(worker, message, handle){
            const {port,stats} = message;
            
            if(port && stats){
                console.log('primary node on message',message);
                if(stats == nodeStats.starting && port){
                    const node_config = node_configs.find(item=>item.port == port)
                    console.log("restart server at port:",node_config.port);
                    reset_node(node_config.port)
                }
            }
        })

        setTimeout(() => {
            for (const id in cluster.workers) {
              cluster.workers[id].send('reset');
            }
          }, 3000);

    }else{
    // 开启子任务
        const config:string = process.env.child_config;
        const worker_env:node_config = JSON.parse(config)
        reset_node(worker_env.port)
    }
}

startServer()