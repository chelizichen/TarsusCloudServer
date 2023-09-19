import path from "path";
import stream_proxy from "../../main_control/taro";
import {generateSchemaFromMap} from "../../main_control/schema";

const routes = process.env.routes_path;
const fileName = "leemulus.taro"
const load_schema = {
    dtoMaps: {},
    get(res: string) {
        return load_schema.dtoMaps[res];
    }
}

function initSchema() {
    const taro_path = path.resolve(routes, "taro", fileName);
    stream_proxy.SetStream(taro_path);
    const structMaps = stream_proxy.TarsusStream.struct_map
    load_schema.dtoMaps = generateSchemaFromMap(structMaps);
}

initSchema();

export {
    load_schema
}
