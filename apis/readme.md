# API请求示例

获取用户目录 api + user_dir
````shell
GET

http://127.0.0.1:3401/api/chelizichen
Req
{
    "port":3411
}
Res
{
    "code": 0,
    "message": "ok",
    "data": {
        "dirs": [
            {
                "type": "file",
                "name": "ping.ts",
                "path": "ping.ts"
            },
            {
                "type": "file",
                "name": "pong.ts",
                "path": "pong.ts"
            },
            {
                "type": "folder",
                "name": "test",
                "path": "test",
                "children": [
                    {
                        "type": "file",
                        "name": "test.ts",
                        "path": "test/test.ts"
                    }
                ]
            }
        ]
    }
}
````

调用云函数
````shell
POST

http://127.0.0.1:3411/leemulus/pong

Res
{
    "message": "ok",
    "code": 0,
    "data": {}
}
````

强制关停节点

````shell
POST

http://127.0.0.1:3401/main/shutdown

Req
{
    "userId":"1"
}

````

重启节点
````shell
POST
http://127.0.0.1:3401/main/reload

{
    "port":3411
}

````