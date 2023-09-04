import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import * as fs from "fs";
import path from "path";

function readDir(dir, parent = '') {
    const items = fs.readdirSync(dir);
    return items.map(item => {
        const fullPath = path.join(dir, item);
        const relPath = path.join(parent, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            return { type: 'folder', name: item, path: relPath, children: readDir(fullPath, relPath) };
        } else {
            return { type: 'file', name: item, path: relPath };
        }
    });
}

function generateHTML(items) {
    return `
      <ul>
        ${items.map(item => `
          <li>
            ${item.type === 'folder' ? '📁' : '📄'} ${item.name}
            ${item.type === 'folder' ? generateHTML(item.children) : ''}
          </li>
        `).join('')}
      </ul>
    `;
}


function patch_func(server: FastifyInstance) {
    const routes = process.env.routes_path
    server.post('/upload', async (request: any, reply) => {
        debugger;
        const data = await request.file();
        const fileContent = await data.toBuffer();
        const originalFilename = data.filename;
        const file_path = path.resolve(routes, originalFilename)

        fs.writeFileSync(file_path, fileContent)

        return { uploaded: true };
    });
    console.log("注册服务");

    server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        console.log(1);

        const items = readDir(routes);
        const html = generateHTML(items);
        reply.type('text/html;charset=utf-8')
        reply.send(`
        <html>
          <head>
            <style>
              ul {
              list-style-type: none;
              }

              li {
              margin: 8px 0;
              }
            </style>
          </head>
          <body>
            ${html}
          </body>
        </html>
      `)
    });

}

export default patch_func