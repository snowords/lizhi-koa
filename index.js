// 引入 Koa 模块
const Koa = require("koa");
// 引入 request 模块
const request = require("request");
// 引入 fs 模块
const fs = require("fs");

const { list } = require("./songList")
// 创建一个 Koa 应用
const app = new Koa();
// 定义一个路由处理函数
app.use(async (ctx) => {
  // 定义一个链接地址
  // var url = "https://testingcf.jsdelivr.net/gh/nj-lizhi/song@master/audio/list-v2.js";
  // // 调用 request() 函数，传入链接地址，获取数据流
  // var stream = request(url);
  // // 定义一个变量存储数据
  // var data = "";
  // // 监听 data 事件，拼接数据
  // stream.on("data", (chunk) => {
  //   data += chunk;
  // });
  // 监听 end 事件，处理数据
  // stream.on("end", () => {
  //   // 去掉数据前面的 var list =
  //   data = data.replace("var list =", "");
  //   // 使用 JSON.parse() 方法将数据转换为 JSON 对象
  //   var json = JSON.parse(data);
  //   // 遍历 JSON 对象中的歌曲列表
    for (let song of list) {
      // 获取歌曲的名称和下载地址
      const { name, artist, url, cover} = song;
      // 定义一个文件路径
      const filePath = "./songs/" + artist + "-" + name + ".mp3";
      // 调用 request() 函数，传入下载地址，获取数据流
      const songStream = request(encodeURI(url));
      // 调用 pipe() 方法，将数据流写入到文件中
      songStream.pipe(fs.createWriteStream(filePath));
    }
  //   // 返回成功的信息
  // });
  ctx.body = "下载成功！";``
});
// 监听 3000 端口
app.listen(3147);
