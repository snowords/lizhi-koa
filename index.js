const Koa = require("koa");
const axios = require("axios");
const fs = require("fs");

const { list } = require("./songList");

const app = new Koa();

// 定义下载歌曲的函数
const downloadSong = async (song) => {
  const { name, url } = song;
  const filePath = `./songs/${name}.mp3`; // 定义歌曲保存的文件路径

  const writer = fs.createWriteStream(filePath); // 创建可写流，用于保存文件
  const response = await axios({ // 发送 HTTP 请求获取歌曲数据
    url: encodeURI(url),
    method: "GET",
    responseType: "stream", // 设置响应类型为流
  });

  response.data.pipe(writer); // 将响应数据流写入文件

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve); // 监听写入完成事件，表示歌曲下载完成
    writer.on("error", reject); // 监听错误事件，表示歌曲下载出错
  });
};

app.use(async (ctx) => {
  const downloadPromises = list.map(downloadSong); // 创建下载歌曲的 Promise 数组

  try {
    await Promise.all(downloadPromises); // 等待所有歌曲下载完成
    ctx.body = "所有歌曲下载完成！"; // 返回成功的信息
  } catch (err) {
    console.error("下载失败:", err);
    ctx.body = "下载失败！"; // 返回失败的信息
  }
});

app.listen(3147); // 监听端口号 3147