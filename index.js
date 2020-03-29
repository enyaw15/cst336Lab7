var express = require("express");//import express
var app = express();//create an app


//tells the app to use the public folder
app.use(express.static("public"));
//set the view engine so we can use ejs
app.set('view engine', 'ejs');

//start the app listening on a port and do a function
app.listen(process.env.PORT, function()
{
    console.log("server active");
});

//looks for url matching the string and does the function
// looks for a /
app.get("/", function(req,res){
    res.render("home.ejs")
});

// regex star takes everything this should be last so that other options are hit first
app.get("*", function(req, res){
    res.render("error.ejs");
});