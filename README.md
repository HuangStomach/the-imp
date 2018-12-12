# the-Imp

中文分词服务，提供基于HTTP的Restful风格接口
可通过docker部署跨语言使用

包含整合:

* [nodejieba](https://github.com/yanyiwu/nodejieba)
* [pullword](http://pullword.com/)


``` bash
docker run \
    --name=the-imp \
    -d \
    -v ~/the-imp/config:/usr/src/app/config \
    -v ~/the-imp/dict:/usr/src/app/dict \
    -p 80:80/tcp \
    --restart=always \
    --privileged \
    huangstomach/the-imp:latest
```

### 使用方法实例

```
GET http://localhost/segment?word=我有一只小柯基
```

``` javascript
[
    [
        "我有",
        "一只",
        "小柯",
        "柯基"
    ],
    [
        "我",
        "有",
        "一只",
        "小",
        "柯基"
    ]
]
```