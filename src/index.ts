import path from "path";
// define routes path
const routes_path = path.resolve(__dirname, "routes")
process.env.routes_path = routes_path;
process.env.IsProd = '0';
import server from "./main_control/server";
// 集群模块
import Fastify, {FastifyInstance} from "fastify";
import loadAll from "./main_control/server";
import cluster from "cluster";
/**
 * @description
 * serverless 主控函数启动器
 */

const startServer = async () => {
    const server = Fastify({ logger: true });

    await server.register(loadAll);

    process.on('message', (msg) => {
        if (msg === 'update') {
            console.log(`Worker ${process.pid} received update message`);
            server.close(() => {
                console.log(`Worker ${process.pid} closed`);
                setTimeout(() => {
                    startServer();  // Restart the server with a new Fastify instance
                }, 3000);  // Wait for 3 seconds
            });
        }
    });

    try {
        await server.listen({ port: 3000 });
        console.log(`Worker ${process.pid} is listening`);
    } catch (err) {
        console.error(`Worker ${process.pid} failed to start:`, err);
        process.exit(1);
    }

};

if (cluster.isPrimary) {  // or cluster.isMaster for Node.js < v16.6.0
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < 2; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });

    setTimeout(() => {
        for (const id in cluster.workers) {
            cluster.workers[id].send('update');
        }
    }, 5000);

} else {
    startServer();
}

startServer()
