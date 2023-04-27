const express = require('express')
const bodyParser = require('body-parser')   //used by xampp to pass json data
const mysql = require('mysql2')

const connection = require ('../database/task_db')
const app = express()
//******************************************************* */
app.get('/get_task', (req, res) => {
    let sql = `SELECT * FROM task`
    connection.query(sql,(err,results)=>{
        if(err) throw err
        else{
            res.send(results).status(200)
        }
    })
});

app.post('/post_task', (req,res)=>{
    const params = req.body
    let sql = `INSERT INTO task VALUES ('${req.body.task_id}','${req.body.task_name}')`;

    console.log(sql);

    connection.query(sql, params, (err, results)=>{
        if(err) throw err
        else{
            res.send( `Record ${params.task_id} has been ADDED`).status(200)
        }
        console.log(req.body)
    })
})

app.delete('/task/:id', (req,res) => {
    let sql = `DELETE FROM task WHERE task_id ='${req.params.id}' `
    connection.query(sql, [req.params.id], (err,results)=>{
        if(err) throw err
        else{
            res.send(`RECORD '${req.params.id}' HAS BEEN DELETED`).status(200)
        }
    })
})

module.exports = app;