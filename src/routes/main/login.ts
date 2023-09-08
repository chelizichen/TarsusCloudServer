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
        body: {
            user_name: {type: "string"},
            password: {type: "string"},
        }
    }
}
type CustomRequest = FastifyRequest<{
    Body: {
        user_name: string;
        password: string;
    };
}>

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {user_name, password} = request.body
    const user = await centerControl.getAccount(user_name, password);
    console.log('user',user)
    return Reply(ReplyBody.success, ReplyBody.success_message, user);
}

export default function () {
    return [opts, handleFunc]
}


