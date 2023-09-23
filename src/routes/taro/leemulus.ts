import path from "path";
import {generateSchemaFromMap} from "../../main_control/schema";
const { TarsusStream,TarsusReadStream } = require("tarsus-cli/taro");

const stream_proxy = {
    TarsusStream,
    TarsusReadStream,
    SetStream(url:string) {
        stream_proxy.StreamInstance = new TarsusStream(url);
    },

    Parse(...args:any[]) {
        return TarsusStream.parse(...args);
    },
    StreamMap:{},
    StreamInstance:null
}

const routes = process.env.routes_path;
const fileName = "leemulus.taro"
const load_schema = {
    dtoMaps: {},
    get(res: string) {
        return load_schema.dtoMaps[res];
    },
    stream_proxy:stream_proxy
}

function initSchema() {
    const taro_path = path.resolve(routes, "taro", fileName);
    stream_proxy.SetStream(taro_path);
    const structMaps = stream_proxy.TarsusStream.struct_map
    load_schema.dtoMaps = generateSchemaFromMap(structMaps);
}

initSchema();

export {
    load_schema,
    initSchema
}
