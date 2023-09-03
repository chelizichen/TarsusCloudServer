import server from "./main_control/server";
import LoadRoutes from "./main_control/serverless";

/**
 * @description
 * serverless 主控函数启动器
 */
const start = async () => {
    try {
        LoadRoutes('src','routes')
        setImmediate(async ()=>{
            await server.listen({
                port:3000,
            })
        })

    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()