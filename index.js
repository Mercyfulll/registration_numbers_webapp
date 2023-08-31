// import registarion number factorry function
// import engine express handlebars
// import body parser for JSON
// import session for carrying info between pages
// import pg-promise for node postgres
// import express web application framework
// import queries from database
// import flash for messages

import pgPromise from "pg-promise";
import  express  from "express";
import bodyParser from "body-parser";
import {engine} from "express-handlebars";
import session from "express-session";
import flash from "connect-flash";
import registrationNumber from "./registration_numbers.js";
import queries from "./services/database.js";
import routes from "./routes/routes.js";

// Create an express instance
// Create a pg-Promise instance
// Create a factory function instance

var app = express()
var pgp = pgPromise();
var reg = registrationNumber()


var connectionString = process.env.DATABASE_URL || 'postgres://ncmlcbqz:SXVviMgE6Vt3-ssTYfVB6Wsj42Tw4t0N@trumpet.db.elephantsql.com/ncmlcbqz?ssl=true'

// Create a queries instance pass database inside 
// Create a database instance and pass connection string inside
// Create a routes instance pass database inside
const db = pgp(connectionString);
var data = queries(db)
var route = routes(data, reg)


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
app.get("/", route.home);

app.post("/",route.functionality);

app.post("/town",route.sorting);

app.get("/reg_number/:regNum",route.one)

app.post("/reset",route.clear)

// declare and set the environment variable PORT 
var PORT = process.env.PORT || 3001 

// Make server to be able to listen to a port
app.listen(PORT, function(){
    console.log("App has started on port:", PORT )
})