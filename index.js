// Import express web application framework
import  express  from "express";

// Create an express instance
var app = express()


// Make a http request  using GET method 
app.get("/", function(req,res){

    // Send http response 
    res.send("Registrataion number webapp")
})

// declare and set the environment variable PORT 
var PORT = process.env.PORT || 3001 

// Make server to be able to listen to a port
app.listen(PORT, function(){
    console.log("App has started on port:", PORT )
})