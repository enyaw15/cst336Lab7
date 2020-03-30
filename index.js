var express = require("express");//import express
var app = express();//create an app
var request = require("request");


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
    var url = `https://pixabay.com/api/?key=15401070-3f0e62fc6ef63c9390f6fb50d&safesearch=true}`
    request(url,function(error,response,dataStream){
        if(!error && response.statusCode == 200){
            var json = JSON.parse(dataStream);
            var images = selectFourImages(json);
            res.render('results',{keyword:"flower",images:images});
        }
    })
});

app.get("/search", function(req, res)
{
    var keyword = req.query.keyword;
    var orientation = req.query.orientation == "h"? "horizontal" : "vertical";
    var url = `https://pixabay.com/api/?key=15401070-3f0e62fc6ef63c9390f6fb50d&q=${keyword}&orientation=${orientation}&safesearch=true}`;
    request(url,function(error,response,dataStream){
        if(!error && response.statusCode == 200){
            var json = JSON.parse(dataStream);
            var images = selectFourImages(json);
            res.render('results',{keyword:keyword,images:images});
        }
    });
});

// regex star takes everything this should be last so that other options are hit first
app.get("*", function(req, res){
    res.render("error.ejs");
});

function selectFourImages(data)
{
    let images = [];
    for(var i = 0; i < 4; i++)
    {
        let img = data.hits[Math.floor(Math.random()*data.hits.length)];
        images.push(img);
    }
    return images;
}