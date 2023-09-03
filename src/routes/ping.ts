import {RouteShorthandOptions} from "fastify";

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    pong: {
                        type: 'string'
                    }
                }
            }
        },
        querystring: {}
    }
}

function handleFunc() {
    return {pong: 'it worked!'}
}

export default function () {
    return [opts, handleFunc]
}


