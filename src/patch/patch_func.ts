import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import * as fs from "fs";
import path from "path";

function readDir(dir, parent = '') {
    const items = fs.readdirSync(dir);
    return items.map(item => {
        const fullPath = path.join(dir, item);
        const relPath = path.join(parent, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            return {type: 'folder', name: item, path: relPath, children: readDir(fullPath, relPath)};
        } else {
            return {type: 'file', name: item, path: relPath};
        }
    });
}
function join(...args) {
    return args
        .filter(arg => typeof arg === 'string' && arg.length > 0)
        .join('/')
        .replace(/\/+/g, '/');
}

function generateHTML(items) {
    return `
      <ul>
        ${items.map(item => `
          <li>
            <div onclick="toRel('${item.path}','${item.type}')" style="cursor: pointer">${item.type === 'folder' ? '📁' : '📄'} ${item.name}</div>
            ${item.type === 'folder' ? generateHTML(item.children) : ''}
          </li>
        `).join('')}
      </ul>
    `;
}


function patch_func(server: FastifyInstance) {
    const routes = process.env.routes_path
    server.post('/$upload', async (request: any, reply) => {
        debugger;
        const data = await request.file();
        const fileContent = await data.toBuffer();
        const originalFilename = data.filename;
        const file_path = path.resolve(routes, originalFilename)

        fs.writeFileSync(file_path, fileContent)

        return {uploaded: true};
    });
    console.log("注册服务");

    //
    server.get('/tarsfity/*', async (request: FastifyRequest, reply: FastifyReply) => {
        const request_url = request.url.replace("tarsfity/","")
        const dir = path.join(routes, request_url)
        console.log('dir',dir)
        if (request.url.endsWith(".js") || request.url.endsWith(".ts")) {
            const file = fs.readFileSync(dir, "utf-8")
            reply.send({content:file})
        } else {
            const items = readDir(dir);
            const dirs = generateHTML(items);
            const action_path:string = join(request_url,"$upload");
            console.log('action_path',action_path)
            reply.send({
                form:`
                    <form 
                          id='upload'
                          action='${action_path}'
                          method='post'
                          encType="multipart/form-data">
                        <input type="file" name="sampleFile" required />
                        <input type='submit' value='Upload!' />
                    </form>
                    `,
                dirs:dirs
            })
        }
    })

}

export default patch_func