const express = require('express')
const path = require("path")
const app = express()
const router = express.Router()
const mysql = require("mysql")
const config = require("./config")


app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

const dbConnection = mysql.createConnection(config.dbConfig);

dbConnection.connect((err)=>{
    if(err){
        throw err;
    }

    console.log("Connected to the Database");
});

router.get("/employee/:id", function(req, res) {

    const empId = req.params.id

    const query = `select * from employees where id = ${empId}`

    dbConnection.query(query, (err, result) => {
        if(err) {
            throw err
        }
        res.render("employee", {
            employee: result[0]
        })
    })
})

router.get("/add-emp", function(req, res) {
    res.render("add-emp")
})

router.post("/del-emp", function(req, res) {
    const query = `delete from employees where id = ${req.body.id}`
    dbConnection.query(query, (err, result) => {
        if(err){
            throw err            
        }
        console.log('delete tabale')
        res.writeHead(302)
        res.end()
    })
})

router.post("/employee", function(req, res){
    const query = `insert into employees (name, age) values (${req.body.name}, ${req.body.age})`
    dbConnection.query(query, (err, result) => {
        if(err) {
            throw err
        }
        res.writeHead(304, {location: "/"})
        res.end()
        
    })
    employee.result[0]
})

router.post("/employee", function(req, res) {
    const query = `update employees set name = '${req.body.name}', age='${req.body.age}' where id = ${req.body.id}`
    dbConnection.query(query, (err, result) => {
        if(err) {
            throw err
        }
    }       
}

app.listen(8080, () => {
    console.log("Server listening to port 8080")
})