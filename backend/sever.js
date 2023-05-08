const express = require("express");

const app = express();
const mysql = require("mysql");

const PORT = 8000;

const pool = mysql.createPool({
          connectionLimit: 10,
          host: "localhost",
          user: "root",
          password: "",
          database: "to_do_app"
});

app.get('/', (req, res) => {
          res.send("Hello World");
});



// to do list全体を返すapi
app.get('/todo', (req, res) => {
          // todo mysqlからデータを取得し返す

          // test respons
          // res.json({id: 0, text: "プレゼン資料作成"});

          pool.getConnection((err, connection) => {
                    if(err) throw err;

                    console.log("connecting mysql");

                    connection.query("SELECT * FROM task", (err, rows) => {
                              connection.release();

                              console.log(rows);
                              if(!err) {
                                        res.send(rows);
                              }
                    });
          });
});

// to do listを追加するapi
app.get('/todo/add', (req, res) => {
          // task を取得
          let taskName = req.query.task;

          console.log(taskName);


          // test respons
          // res.json({id: 0, text: "プレゼン資料作成"});

          // todo mysqlからデータを取得し返す
          if (taskName != null){
                    pool.getConnection((err, connection) => {
                              if(err) throw err;
          
                              console.log("connecting mysql");
          
                              connection.query(`INSERT INTO task values (NULL, "${taskName}")`, (err, rows) => {
                                        connection.release();
          
                                        console.log(rows);
                                        if(!err) {
                                                  res.redirect("/todo");
                                        }else {
                                                  console.log(err);
                                        }
                              });
                    });
          }else {
                    console.log("task is null");
                    res.redirect("/todo");
          }
});


// to do listを削除するapi
// 実際のデータベース上からは削除せず、見えないように設定する
app.get('/todo/delete', (req, res) => {
          // task を取得
          let deleteTaskId = req.query.id;

          console.log(deleteTaskId);


          // test respons
          // res.json({id: 0, text: "プレゼン資料作成"});

          // todo mysqlからデータを取得し返す
          if (deleteTaskId != null){
                    pool.getConnection((err, connection) => {
                              if(err) throw err;
          
                              console.log("connecting mysql");
          
                              connection.query(`DELETE FROM task WHERE id=?`, [deleteTaskId], (err, result) => {
                                        connection.release();

                                        if(!err) {
                                                  res.redirect("/todo");
                                        }else {
                                                  console.log(err);
                                        }
                              });
                    });
          }else {
                    console.log("id is null");
                    res.redirect("/todo");
          }
});

// to do listを更新するapi
app.get('/todo/update', (req, res) => {
          // task を取得
          let updateTaskId = req.query.id;
          let updateTaskName = req.query.task;

          console.log(updateTaskId, updateTaskName);

          // test respons
          // res.json({id: 0, text: "プレゼン資料作成"});

          // todo mysqlからデータを取得し返す
          if (updateTaskId != null && updateTaskName != null){
                    pool.getConnection((err, connection) => {
                              if(err) throw err;
          
                              console.log("connecting mysql");
          
                              connection.query(`UPDATE task SET taskInfo=? WHERE id=?`, [updateTaskName, updateTaskId], (err, result) => {
                                        connection.release();

                                        if(!err) {
                                                  res.redirect("/todo");
                                        }else {
                                                  console.log(err);
                                        }
                              });
                    });
          }else {
                    console.log("id is null");
                    res.redirect("/todo");
          }
});


app.listen(PORT, () => {
          console.log("running sever");
});