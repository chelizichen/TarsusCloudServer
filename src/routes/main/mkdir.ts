import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { RouteHandlerMethod } from "fastify/types/route";
import path from "path";
import fs from "fs";
import { Reply, ReplyBody, centerControl } from "../../main_control/define";
import moment from "moment";

const routes = process.env.routes_path;

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                    },
                    code: {
                        type: "number",
                    },
                    data: {
                        type: "object",
                        properties: {
                            dirPath: {
                                type: "string",
                            },
                        },
                    },
                },
            },
        },
        body: {
            dir: {
                type: "string",
            },
            user_id: {
                type: "string",
            },
            primary_id: {
                type: "string",
            },
            port: {
                type: "string"
            }
        },
    },
};

type CustomRequest = FastifyRequest<{
    Body: { dir: string; user_id: string; primary_id: string; port: string; };
}>;

function getDirObj(body) {
    const { dir, user_id, primary_id, port } = body;
    const dbRows: Record<string, any> = {}
    dbRows.user_id = user_id
    dbRows.dir = dir
    dbRows.primary_id = primary_id
    dbRows.port = port
    dbRows.create_time = moment().format("YYYY-MM-DD HH:mm:ss")
    return dbRows;
}

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const { dir } = request.body;
    const dbRows = getDirObj(request.body);
    const dirPath = path.resolve(routes, "api", dir);
    try{
        await centerControl.saveDirs(dbRows)
        fs.mkdirSync(dirPath);
        return Reply(ReplyBody.success, ReplyBody.success_message, {
            dirPath: dirPath,
        });
    }catch(e){
        return Reply(ReplyBody.error,ReplyBody.mkdir_err,null)
    }

};

export default async function () {
    return [opts, handleFunc];
}
