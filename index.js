// import registarion number factorry function
// import engine express handlebars
// import body parser for JSON
// import session for carrying info between pages
// import pg-promise for node postgres
// import express web application framework
// import flash for messages

import registrationNumber from "./registration_numbers.js";
import {engine} from "express-handlebars";
import bodyParser from "body-parser";
import session from "express-session";
import pgPromise from "pg-promise";
import  express  from "express";
import flash from "connect-flash";


// Create an express instance
// Create a pg-Promise instance
// Create a factory function instance

var app = express()
var pgp = pgPromise();
var reg = registrationNumber()

var connectionString = process.env.PORT || 'postgres://ncmlcbqz:SXVviMgE6Vt3-ssTYfVB6Wsj42Tw4t0N@trumpet.db.elephantsql.com/ncmlcbqz'

// Create a database instance and pass connection string inside
const db = pgp(connectionString);

// use the express.static built-in middleware to serve static file 'css'
app.use(express.static(('public')))

// set and callback engine 
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//use session to maintain data on the application
app.use(session({
    secret : 'This is a string',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// error handling function
app.use(function (req, res, next) {
    res.locals.messages = req.flash();
    next();
  })



// Make a http request  using GET method 
app.get("/", async function(req,res){
    try{
    let townReg = await db.manyOrNone("SELECT registration_numbers.reg_num FROM registration_numbers JOIN towns ON registration_numbers.towns_id = towns.id");

    // Send http response 
    res.render("index", {townReg})

    }catch(err){
        console.log("info","Something went wrong")
    }
});

app.post("/", async function(req,res){
    try{

        let registration = req.body.regiNumber
        let townReg = await db.manyOrNone("SELECT registration_numbers.reg_num FROM registration_numbers JOIN towns ON registration_numbers.towns_id = towns.id");
    
        if(registration === ''){
            req.flash("error","Empty entry please enter registration")
        }else if (!reg.validateRegNum(registration)){
            req.flash('error','Please enter valid registration')
        }
        else {
            let townsIdObj = await db.oneOrNone('SELECT id FROM towns WHERE reg_num_start = $1',[reg.registrationCharacter(registration)]);
            let townsId = townsIdObj.id;
            await db.none('INSERT INTO registration_numbers (reg_num, towns_id) VALUES($1,$2)',[reg.validateRegNum(registration),townsId]);
        }
        res.render("index",{townReg})

        } catch(err){
            req.flash("info","Something went wrong");
        }
});

app.post("/town", async function(req,res){

    try{

    let selectValue = req.body.townSelect
    let townReg = await db.manyOrNone("SELECT registration_numbers.reg_num FROM registration_numbers JOIN towns ON registration_numbers.towns_id = towns.id WHERE town_name = $1",[selectValue]);
    
    res.render("index",{townReg})

    }catch(err){
        req.flash("info","Something went wrong");
    }
    
});

app.get("/reg_number/:regNum", async function(req,res){
    let regNumber = req.params.regNum
   

    res.render("registration", {regNumber})
})

app.post("/reset",async function(req,res){
   try{
    reg.reset()
    await db.none("DELETE FROM registration_numbers");

    res.redirect("/")
    }catch(err){
        req.flash("info","Something went wrong");
    }
    
})

// declare and set the environment variable PORT 
var PORT = process.env.PORT || 3001 

// Make server to be able to listen to a port
app.listen(PORT, function(){
    console.log("App has started on port:", PORT )
})