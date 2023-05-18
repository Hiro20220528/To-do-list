const express = require("express");
require("dotenv").config();

const app = express();
const mysql = require("mysql");

const PORT = 8000;
app.use(express.json()); // post bodyを受け取る
const pool = mysql.createPool({
          connectionLimit: 10,
          host: process.env.SQL_HOST,
          user: process.env.SQL_USER,
          password: process.env.SQL_PASSWORD,
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

                    connection.query("SELECT * FROM myTask", (err, rows) => {
                              connection.release();

                              console.log(rows);
                              if(!err) {
                                        // res.send(rows[0]);
                                        res.json(rows);
                              }
                    });
          });
});

app.post('/todo/post', (req, res) => {

          // console.log(req);
          console.log(req.body);
          const task = {
                    title: req.body.title,
                    deadline: req.body.deadline,
                    memo: req.body.memo,
          };

          pool.getConnection((err, connection) => {
                    if(err) throw err;

                    console.log("connecting mysql");

                    connection.query(`INSERT INTO myTask SET ?`, task, (err, rows) => {
                              connection.release();

                              console.log(rows);
                              if(!err) {
                                        // res.render("/todo");
                                        res.redirect("/todo");
                                        console.log("success making new task!");
                              }else {
                                        console.log(err);
                              }
                    });
          });

});

app.delete('/todo/delete', (req, res) => {

          // console.log(req);
          // console.log(req.body);
          // task を取得
          let deleteTaskId = req.body.id;

          console.log(deleteTaskId);


          // test respons
          // res.json({id: 0, text: "プレゼン資料作成"});

          // // todo mysqlからデータを取得し返す
          pool.getConnection((err, connection) => {
                    if(err) throw err;

                    console.log("connecting mysql");

                    connection.query(`DELETE FROM myTask WHERE id=?`, [deleteTaskId], (err, result) => {
                              connection.release();

                              if(!err) {
                                        res.redirect("/todo");
                                        console.log("success deleting new task!")
                              }else {
                                        console.log(err);
                              }
                    });
          });
          

});


app.put('/todo/put', (req, res) => {
          // let updateTaskId = req.query.id;
          // let updateTaskName = req.query.task;

          const task = {
                    id: req.body.id,
                    title: req.body.title,
                    deadline: req.body.deadline,
                    memo: req.body.memo,
          };

          // console.log(updateTaskId, updateTaskName);

          // test respons
          // res.json({id: 0, text: "プレゼン資料作成"});

          // todo mysqlからデータを取得し返す
          if (task.id != null && task.title != null){
                    pool.getConnection((err, connection) => {
                              if(err) throw err;
          
                              console.log("connecting mysql");
          
                              connection.query(`UPDATE myTask SET ? WHERE id=?`, [task, task.id], (err, result) => {
                                        connection.release();

                                        if(!err) {
                                                  res.redirect("/todo");
                                                  // res.json({id: 0, text: "sample"});
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

// ***************************************************************************************************


app.get('/todo-dev', (req, res) => {
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
                                        // res.send(rows[0]);
                                        res.json(rows);
                              }
                    });
          });
});






app.post('/todo/update', (req, res) => {

          // console.log(req);
          console.log(req.body);
          const task = {
                    id: req.body.id,
                    title: req.body.title,
                    deadline: req.body.deadline,
                    memo: req.body.memo,
          };
          console.log(`update task -> ${task}`);
          
          // pool.getConnection((err, connection) => {
          //           if(err) throw err;

          //           console.log("connecting mysql");

          //           connection.query(`UPDATE myTask SET title=?, deadline=?, memo=? WHERE id=?`, [req.body.title, req.body.deadline, req.body.memo, req.body.id], (err, result) => {
          //                     connection.release();

          //                     if(!err) {
                                        // res.redirect("/todo");
                                        // console.log("success update task!")
          //                     }else {
          //                               console.log(err);
          //                     }
          //           });
          // });

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
                                                  // res.redirect("/todo");
                                        }else {
                                                  console.log(err);
                                        }
                              });
                    });
          }else {
                    console.log("task is null");
                    // res.redirect("/todo");
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