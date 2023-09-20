let taroTsTemplate = (dirName) => `
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load_schema = void 0;
var path_1 = __importDefault(require("path"));
var schema_1 = require("../../main_control/schema");
var _a = require("tarsus-cli/taro"), TarsusStream = _a.TarsusStream, TarsusReadStream = _a.TarsusReadStream;
var stream_proxy = {
    TarsusStream: TarsusStream,
    TarsusReadStream: TarsusReadStream,
    SetStream: function (url) {
        new TarsusStream(url);
    },
    Parse: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return TarsusStream.parse.apply(TarsusStream, __spreadArray([], __read(args), false));
    },
    StreamMap: {}
};
var routes = process.env.routes_path;
var fileName = "${dirName}.taro";
var load_schema = {
    dtoMaps: {},
    get: function (res) {
        return load_schema.dtoMaps[res];
    }
};
exports.load_schema = load_schema;
function initSchema() {
    var taro_path = path_1.default.resolve(routes, "taro", fileName);
    stream_proxy.SetStream(taro_path);
    var structMaps = stream_proxy.TarsusStream.struct_map;
    load_schema.dtoMaps = (0, schema_1.generateSchemaFromMap)(structMaps);
}
initSchema();
`

let taroTemplate = (dirName)=>`
/**
* @description ${dirName}结构体
*/

java_struct_package = https://github.com/chelizichen;
java_inf_package =  https://github.com/chelizichen;

struct ${dirName}Taro  {


};


interface ${dirName}Inf  {

};
`

export{
    taroTsTemplate,
    taroTemplate
}