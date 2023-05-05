const express = require("express");

const app = express();

const PORT = 8000;

app.get('/', (req, res) => {
          res.send("Hello World");
});

// to do list全体を返すapi
app.get('/api', (req, res) => {
          // todo mysqlからデータを取得し返す

          // test respons
          res.json({id: 0, text: "プレゼン資料作成"});
});

// to do listを追加するapi

// to do listを削除するapi
// 実際のデータベース上からは削除せず、見えないように設定する

// to do listを更新するapi