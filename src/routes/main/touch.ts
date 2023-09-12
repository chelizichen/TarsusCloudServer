import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {RouteHandlerMethod} from "fastify/types/route";
import path from "path";
import fs from "fs";
import {Reply, ReplyBody} from "../../main_control/define";
import {spawn, spawnSync} from "child_process";
import * as os from "os";

const routes = process.env.routes_path;

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    },
                    code: {
                        type: "number"
                    },
                    data: {
                        type: "object",
                        properties: {
                            uploaded: {
                                type: "boolean"
                            },
                            write_file_path: {
                                type: "string"
                            },
                        }
                    }
                }
            }
        },
        // body: {
        //     dir:{
        //         type:"string"
        //     },

        // }
    }
}
type CustomRequest = FastifyRequest<{
    Querystring: { dir: string };
}>
const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {

    const {dir} = request.query
    const data = await request.file();
    console.log('req.file', data);
    console.log('req.dir', dir);
    const fileContent = await data.toBuffer();
    const originalFilename = data.filename;
    const file_path = path.join(routes, "api", dir, originalFilename)
    console.log(file_path)
    fs.writeFileSync(file_path, fileContent)
    debugger
    if (originalFilename.endsWith('.ts')) {
        const tempTsConfig = {
            compilerOptions: {
                "strictPropertyInitialization": false,
                "esModuleInterop": true,
                "downlevelIteration": true,
                "target": "es5",
                "lib": ["es2022", "ESNext"],
                "strict": false
            },
            include: [file_path]
        };
        const tempTsConfigPath = path.join(os.tmpdir(), 'tempTsConfig.json');
        fs.writeFileSync(tempTsConfigPath, JSON.stringify(tempTsConfig));
        spawnSync("tsc", ["--project", tempTsConfigPath])
        fs.unlinkSync(tempTsConfigPath);
    }
    return Reply(ReplyBody.success, ReplyBody.success_message, {uploaded: true, write_file_path: file_path});
}

export default function () {
    return [opts, handleFunc]
}


