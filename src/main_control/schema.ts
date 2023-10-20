const fastJson = require('fast-json-stringify')
const load_schema = {
    dtoMaps: {},
    get(res:string){
        return load_schema.dtoMaps[res];
    }
}

function typeMapping(type, mapData) {
    switch (type) {
        case 'int': return {type:'number'};
        case 'string': return {type:'string'};
        default:
            // If the type exists in mapData, then return the appropriate schema.
            if (mapData.has(type)) {
                return generateSchemaFromMap(new Map([[type, mapData.get(type)]]))[type];
            } else {
                throw new Error(`Unsupported type: ${type}`);
            }
    }
}

function generateSchemaFromMap(mapData) {
    let result = {};

    for (let [key, value] of mapData) {
        result[key] = {
            type: 'object',
            properties: {}
        };
        for (let item of value) {
            const { param, type } = item;
            if (type.startsWith('List<') && type.endsWith('>')) {
                const listItemType = type.slice(5, type.length - 1);
                if (mapData.has(listItemType)) {
                    result[key].properties[param] = {
                        type: 'array',
                        items: generateSchemaFromMap(new Map([[listItemType, mapData.get(listItemType)]]))[listItemType]
                    };
                } else {
                    try {
                        // If the list type is a basic type, like 'string' or 'int'
                        result[key].properties[param] = {
                            type: 'array',
                            items: { type: typeMapping(listItemType, mapData) }
                        };
                    } catch (e) {
                        throw new Error(`Missing definition for type ${listItemType}`);
                    }
                }
            } else {
                result[key].properties[param] = typeMapping(type, mapData);
            }
        }
    }

    return result;
}

function FastStringify(response: string, data: Record<string, any>): string {
    debugger;
    const response$dto = load_schema.dtoMaps[response];
    const toStringify = fastJson(response$dto)
    return toStringify(data);
}



export {
    generateSchemaFromMap,
    typeMapping,
    FastStringify
}

export default load_schema