# TarsusCloudServer

## FASS服务平台



1. 技术支持：前端Vue+Vite 后台 Fastify+TypeScript

2. 技术细节

   1. 冷启动优化：在无函数调用时，自动关闭实例，当有函数调用时，冷启动开启Fastify实例。优化点：前端异步调用，后端对上传的函数进行 Compress 处理。

   2. 一主多从模型：主控节点负责分发从节点，每个用户对应一个从节点，每个用户拥有一个Fastify实例，用来处理请求。参照代码如下：

      ```ts
      import Fastify, { FastifyInstance } from "fastify";
      import cluster from "cluster";
      import path from "path";
      const routes_path = path.resolve(__dirname, "routes")
      process.env.routes_path = routes_path;
      process.env.IsProd = '0';
      import loadAll from "./main_control/server";
      
      enum nodeStats{
          alive,
          died,
          starting = 30,
          exit = 40
      }
      
      type node_config = {
          port:number,
          config:{
              isPrimary:boolean,
              stats:nodeStats,
              logger?:boolean
          }
      }
      
      const node_configs:node_config[] = [
          // 主控需要端口隔离
          {
              port:3401,
              config:{
                  isPrimary:true,
                  stats:nodeStats.died,
                  logger:true
              }
          },
          {
              port:3411,
              config:{
                  isPrimary:false,
                  stats:nodeStats.died
              }
          },
          {
              port:3412,
              config:{
                  isPrimary:false,
                  stats:nodeStats.died
              }
          }
      ]
      
      async function reset_node(port:number){
          const config = node_configs.find(item=>item.port == port)
          if (!config) {
              console.error("Config not found for port:", port);
              return;
          }
          try{
              const server = Fastify({ logger: config.config.logger });
              await server.register(loadAll);
              await server.listen({ port: config.port });
              console.log("监听port", config.port, "成功");
      
              // 父向子传递重启信息，子告诉父需要重启信息，并且自动断开
              process.on('message',function(msg){
                  if(msg == "reset"){
                      const sendToPrimary = {
                          stats:nodeStats.starting,
                          port:port
                      }
                      // 强制重启
                      process.send(sendToPrimary,function(){
                          process.exitCode = nodeStats.exit
                          process.exit()
                      })
                  }
              })
          }catch(e){
              console.error("Error in reset_node for port:", port, e);
          }
      }
      
      async function startServer() {
          const primary_node:node_config = node_configs.find(item=>item.config.isPrimary == true)
          const worker_nodes:node_config[] = node_configs.filter(item=>!item.config.isPrimary)
          if(cluster.isPrimary){
              
              for (let i = 0; i < worker_nodes.length; i++) {
                  const fork_env:string = JSON.stringify(worker_nodes[i])
                  cluster.fork({
                      fastify_config:fork_env
                  });
              }
              
              cluster.on('exit', (worker, code, signal) => {
                  console.log(code);
                  if(code == nodeStats.exit){
                      console.log(`Worker ${worker.process.pid} will restart exit.code = 30`);
                  }else{
                      console.log(`Worker ${worker.process.pid} died`);
                  }
              });
              // set env
              process.env.fastify_config = JSON.stringify(primary_node)
      
              try {
                  await reset_node(primary_node.port);
              } catch (e) {
                  console.error("Error in primary node:", e);
              }
      
              cluster.on('message',function(worker, message, handle){
                  const {port,stats} = message;
                  
                  if(port && stats){
                      console.log('primary node on message',message);
                      if(stats == nodeStats.starting && port){
                          const node_config = node_configs.find(item=>item.port == port)
                          console.log("restart server at port:",node_config.port);
                          reset_node(node_config.port)
                      }
                  }
              })
      				// 关闭节点的调试
              // setTimeout(() => {
              //     for (const id in cluster.workers) {
              //       cluster.workers[id].send('reset');
              //     }
              //   }, 3000);
      
          }else{
              const config = process.env.fastify_config;
              if (!config) {
                  console.error("fastify_config not found in environment variables");
                  return;
              }
              const worker_env = JSON.parse(config);
              try {
                  await reset_node(worker_env.port);
              } catch (e) {
                  console.error("Error in worker node:", e);
              }
          }
      }
      
      startServer().catch(e => console.error("Error in startServer:", e));
      ```

      

   3. 统一规则：每个函数只允许Http-Post调用,且每个云函数默认导出为一个数组。规则如下：第一项为选项，用于优化请求和响应过程，参照Fastify文档。第二项为处理请求的方法。参照代码如下：

      ```ts
      import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
      import {RouteHandlerMethod} from "fastify/types/route";
      const opts: RouteShorthandOptions = {
          schema: {
              response: {
                  200: {
                      type: 'object',
                      properties: {
                          pong: {
                              type: 'string'
                          }
                      }
                  }
              },
              querystring: {}
          }
      }
      const  handleFunc:RouteHandlerMethod = (request:FastifyRequest, reply:FastifyReply)=> {
          return {pong: '12it worked!'}
      }
      export default function () {
          return [opts, handleFunc]
      }
      ```

   

3. 流程：创建用户 -> 系统为用户默认提供云函数目录 -> 用户本地编写云函数 -> 上传编译后的函数 -> 提交至云服务管理平台 -> 系统将文件存储到该用户目录下 ->  系统关闭该用户的从节点并删除实例->系统重启该用户所拥有的从节点 -> 系统加载该用户所对应的目录下所有的云函数(**技术痛点：目前Fastify不能做到动态添加路由**) -> 提供云函数服务。

   ```ts
   import * as fs from "fs";
   import path from "path";
   import {FastifyInstance, RouteShorthandOptions} from "fastify";
   
   // 环境定义
   console.log('process.env.IsProd',process.env.IsProd)
   
   let suffix = ""
   if(process.env.IsProd == "1"){
       // 生产环境只支持js
       suffix = ".js"
   }else {
       suffix = ".ts"
   }
   
   
   async function load_routes(server:FastifyInstance,dir, prefix = '') {
       const files = fs.readdirSync(dir);
       for (const file of files) {
           const filePath = path.join(dir, file);
           const stat = fs.statSync(filePath);
           if (stat.isDirectory()) {
               // 如果为目录，则为该目录提供一个接口，可以通过该目录去上传文件
             	// 默认路径为 (每个目录/$upload)
               await load_routes(server,filePath, `${prefix}/${file}`);
               const routes = process.env.routes_path
               const upload_path =  `${prefix}/${file}/$upload`;
               console.log('upload_path',upload_path)
               server.route({
                   method:"POST",
                   url:upload_path,
                   handler:async function(request,reply){
                       const data = await request.file();
                       const fileContent = await data.toBuffer();
                       const originalFilename = data.filename;
                       const file_path = path.join(routes,upload_path,originalFilename).replace("/$upload","")
                       console.log(file_path)
                       fs.writeFileSync(file_path,fileContent)
                       return { uploaded: true,write_file_path:file_path };
                   }
               })
           } else if (stat.isFile() && (filePath.endsWith(suffix)) ) {
               try{
                   const file_path = path.resolve(dir,file)
                   const route = await import(file_path);
                   const [opts, handler]:any[]=  route.default();
                   const routePath = `${prefix}/${path.basename(file, suffix)}`;
                   console.log(routePath + ' is load success')
                   server.route({
                       method: 'POST',
                       url: routePath,
                       ...opts,
                       handler
                   });
               }catch (e){
                   console.log(e)
               }
           }
       }
   }
   
   export default load_routes;
   ```

   