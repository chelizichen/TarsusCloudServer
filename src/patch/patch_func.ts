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
    server.post('/upload', async (request: any, reply) => {
        debugger;
        const data = await request.file();
        const fileContent = await data.toBuffer();
        const originalFilename = data.filename;
        const file_path = path.resolve(routes, originalFilename)

        fs.writeFileSync(file_path, fileContent)

        return {uploaded: true};
    });
    console.log("注册服务");

    server.get('/*', async (request: FastifyRequest, reply: FastifyReply) => {
        console.log(request.url)
        const dir = path.join(routes, request.url)
        if (request.url.endsWith(".js") || request.url.endsWith(".ts")) {
            const file = fs.readFileSync(dir, "utf-8")
            reply.send({content:file})
        } else {
            const items = readDir(dir);
            const html = generateHTML(items);
            reply.type('text/html;charset=utf-8')
            reply.send(`
        <html>
          <header>
            <style>
              ul {
              list-style-type: none;
              }

              li {
              margin: 8px 0;
              }
              .lay{
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
              }
            </style>
            <script>
                function join(...args) {
                  return args
                    .filter(arg => typeof arg === 'string' && arg.length > 0)
                    .join('/')
                    .replace(/\\/+/g, '/');
                }
                  function toRel(rel_path,type){
                    let s = join(location.pathname,rel_path);
                    if(type== "folder"){
                      window.location.href = s;
                    }else {
                        console.log(s)
                        fetch(s).then(res=>res.json()).then(res=>{
                            const content = document.getElementById("file-content")
                            content.innerText = res.content
                        })
                    }
                  }
            </script>
            <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>
          </header>
          <body>
            <div class="lay">
              <div>
                ${html}
              </div>
              <div>
                 <pre class="prettyprint lang-typescript" style="padding: 10px;">
                        <code id="file-content">
                        </code>
                  </pre>
              </div>
              <div>
                <form ref='uploadForm'
                    id='uploadForm'
                    action='${join(request.url,"$upload")}'
                    method='post'
                    encType="multipart/form-data">
                    <input type="file" name="sampleFile" required><br><br>
                    <input type='submit' value='Upload!' />
                </form>
              </div>
            </div>
          </body>
        </html>
      `)
        }
    });

}

export default patch_func