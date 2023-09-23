let taroTsTemplate = (dirName) => `
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSchema = exports.load_schema = void 0;
var path_1 = require("path");
var schema_1 = require("../../main_control/schema");
var _a = require("tarsus-cli/taro"), TarsusStream = _a.TarsusStream, TarsusReadStream = _a.TarsusReadStream;
var stream_proxy = {
    TarsusStream: TarsusStream,
    TarsusReadStream: TarsusReadStream,
    SetStream: function (url) {
        stream_proxy.StreamInstance = new TarsusStream(url);
    },
    Parse: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return TarsusStream.parse.apply(TarsusStream, args);
    },
    StreamMap: {},
    StreamInstance: null
};
var routes = process.env.routes_path;
var fileName = "${dirName}.taro";
var load_schema = {
    dtoMaps: {},
    get: function (res) {
        return load_schema.dtoMaps[res];
    },
    stream_proxy: stream_proxy
};
exports.load_schema = load_schema;
function initSchema() {
    var taro_path = path_1.resolve(routes, "taro", fileName);
    stream_proxy.SetStream(taro_path);
    var structMaps = stream_proxy.TarsusStream.struct_map;
    load_schema.dtoMaps = (0, schema_1.generateSchemaFromMap)(structMaps);
}
exports.initSchema = initSchema;
initSchema();
`

let taroTemplate = (dirName)=>`
/**
* @description ${dirName}结构体
*/

java_struct_package = https://github.com/chelizichen;
java_inf_package =  https://github.com/chelizichen;

struct ${dirName}Taro  {
    QueryIdReq                  :   {
        1   id                  :   string;
    };

    BaseResponse                :   {
        1   code                :       int;    // 
        2   message             :       string; // 
    };
};


interface ${dirName}Inf  {

};
`

export{
    taroTsTemplate,
    taroTemplate
}