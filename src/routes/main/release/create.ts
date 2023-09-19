import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {RouteHandlerMethod} from "fastify/types/route";
import path from "path";
import fs, {mkdir} from "fs";
import {Reply, ReplyBody, centerControl} from "../../../main_control/define";
import moment from "moment";
import load_schema from "../../../main_control/schema";
import tar from 'tar'

const routes = process.env.routes_path;

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200: load_schema.get("BaseResponse")
        },
        body: load_schema.get("ReleasePackageReq"),
    },
};

type CustomRequest = FastifyRequest<{
    Body: {
        dir_id: string;
        user_id: string;
        package_info: string;
        package_version: string;
        dir_path: string;
    };
}>;


const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {dir_path, package_version} = request.body;
    // 拿到对应 项目的release Path
    const dirPath = path.resolve(routes, "api", dir_path)
    const releaseDir = path.resolve(routes, "release")
    if (!fs.existsSync(releaseDir)) {
        fs.mkdirSync(releaseDir)
    }
    const releasePath = path.resolve(routes, "release", dir_path);
    if (!fs.existsSync(releasePath)) {
        fs.mkdirSync(releasePath)
    }
    const releaseFilePath = path.resolve(releaseDir, dir_path, `${dir_path}_v${package_version}.tar.gz`);
    tar.c({
        gzip: true,
        file: releaseFilePath,
        cwd: path.dirname(dirPath)
    }, [path.basename(dirPath)])
        .then(async () => {
            const dbRows = request.body;
            await centerControl.releasePackage(dbRows);
            reply.send(Reply(ReplyBody.success, ReplyBody.success_message, {
                dirPath: dirPath,
            }));
        })
        .catch(err => {
            console.log(err);
            reply.send(Reply(ReplyBody.error, ReplyBody.mkdir_err, null));
        });

};

export default async function () {
    return [opts, handleFunc];
}
