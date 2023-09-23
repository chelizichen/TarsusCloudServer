import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import path from "path";
import { Reply, ReplyBody } from "../../../main_control/define";
import load_schema from "../../../main_control/schema";

function createInf(str) {
  let parts = str.split(":");
  let returnType = parts[0].trim().split(" ")[0];
  let methodName = parts[0].trim().split("(")[0].split(" ")[1].trim();
  let reqType = parts[1].trim().split(",")[0].trim();
  let resType = parts[2].trim().split(")")[0].trim();
  return {
    returnType: returnType,
    methodName: methodName,
    requestType: reqType,
    responseType: resType,
  };
}

function createTsType(target: string, TarsusStream) {
  return TarsusStream.struct_map.get(target);
}

const routes = process.env.routes_path;

const opts: RouteShorthandOptions = {
  schema: {
    // response: {
    //     200: load_schema.get("GetTaroFileRsp")
    // },
    body: load_schema.get("SetTaroInfReq"),
  },
};
type CustomRequest = FastifyRequest<{
  Body: {
    dir: string;
    target: string;
  };
}>;

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
  const { dir, target } = request.body;
  const filePath = path.resolve(routes, "taro", dir + ".js");
  const { load_schema } = require(filePath);
  const _interFace = load_schema.stream_proxy.StreamInstance._interFace.find(
    (item) => item == target
  );
  const inf = createInf(_interFace);
  const requestType = createTsType(
    inf.requestType,
    load_schema.stream_proxy.TarsusStream
  );
  return Reply(ReplyBody.success, ReplyBody.success_message, {
    requestType,
    interFace: inf,
  });
};

export default function () {
  return [opts, handleFunc];
}
