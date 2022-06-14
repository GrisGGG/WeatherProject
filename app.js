const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "8014206db8b17f9a14070c59d0954e69";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" + apiKey + "&units=" + unit;
    
    https.get(url, function (response) {
        console.log(response.statusCode);
        
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + ".png"
            res.write("<p>The weather is  currently " + weatherDescription + "  </p>")
            res.write("<h2>The temperature in " + query + " is " + temp + "  </h2>")
            res.write("<img src=" + imageURL+ ">")
            res.send()
   
        })
    })
});


app.listen(3000, () => {
    console.log(`Example app listening on port`);
  })
    /*
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {

*/
            /*
            const query = "London";
            const apiKey = "";
            const unit = "";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
            

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + ".png"
            res.write("<p>The weather is  currently " + weatherDescription + "  </p>")
            res.write("<h2>The temperature in Puebla is " + temp + "  </h2>")
            res.write("<img src=" + imageURL+ ">")
            res.send()
   
        })
    });
   */
    


