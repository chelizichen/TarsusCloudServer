import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import path from "path";
import {centerControl, node_config, Reply, ReplyBody} from "../../main_control/define";
import cluster from "cluster";


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
                    data: {}
                }
            }
        },
        querystring: {
            id: {type: "string"},
        }
    }
}
type CustomRequest = FastifyRequest<{
    Body: {
        id: string;
    };
}>

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {id} = request.body
    const dirs = await centerControl.getUserDirs(id);
    return Reply(ReplyBody.success, ReplyBody.success_message, dirs);
}

export default function () {
    return [opts, handleFunc]
}
