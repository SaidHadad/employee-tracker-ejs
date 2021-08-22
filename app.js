const express = require('express')
const path = require("path")
const app = express()
const router = express.Router()
const mysql = require("mysql")
const config = require("./config")
const bodyParser = require("body-parser")

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

const dbConnection = mysql.createConnection(config.dbConfig);

dbConnection.connect((err)=>{
    if(err){    
        throw err
        //return console.error('error: ' + err.message);
    }
    console.log("Connected to the Database");
});


router.get("/", function (req, res) {
    const query = "SELECT * FROM personel ORDER BY id ASC"
    //err
    dbConnection.query(query, (err, result)=> {
        if(err){
            throw err
        }
        //renders homepage if data reterival is successful
        res.render("index", {
            personel: result,
        });
    });  
});

router.get("/empdetails/:id", function(req, res) {

    const empId = req.params.id

    const query = `SELECT * FROM personel WHERE id = ${empId}`

    dbConnection.query(query, (err, result) => {
        if(err) {
            throw err
        }
        res.render("empdetails", {
            personel: result[0]
        })
    })
})

router.get("/addemp", function(req, res) {
    res.render("addemp")
})

router.post("/del-emp", function(req, res) {
    const query = `DELETE FROM personel WHERE id = ${req.body.id}`
    dbConnection.query(query, (err, result) => {
        if(err){
            throw err            
        }
        console.log('delete table')
        res.writeHead(302)
        res.end()
    })
})

router.post("/insert-emp", function(req, res){
    const query = `INSERT INTO personel (first_name, last_name, age) VALUES ("${req.body.first_name}", "${req.body.last_name}", "${req.body.age}");`
    
    dbConnection.query(query, (err, result) => {
        if(err) {
            throw err
        }
        console.log("personel added")
        res.writeHead(304, {location: "/"})
        res.end()
        
    })
})

router.post("/update-emp", function(req, res) {
    const query = `update employees set name = '${req.body.name}', age='${req.body.age}' where id = ${req.body.id}`
    dbConnection.query(query, (err, result) => {
        if(err) {
            throw err
        }
        res.writeHead(302, { location: "/"})
        res.end()
    })
    employee.result[0]
})

app.use("/", router)

app.listen(config.serverPort,()=>{
    console.log('Server listening to 8081');
});