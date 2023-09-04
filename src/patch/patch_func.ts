import {FastifyInstance} from "fastify";
import * as fs from "fs";
import path from "path";


function patch_func(server:FastifyInstance){
    const routes = process.env.routes_path
    server.post('/upload', async (request:any, reply) => {
        debugger;
        const data = await request.file();
        const fileContent = await data.toBuffer();
        const originalFilename = data.filename;
        const file_path = path.resolve(routes,originalFilename)

        fs.writeFileSync(file_path,fileContent)

        return { uploaded: true };
    });
}

export default patch_func