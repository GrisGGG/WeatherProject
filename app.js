const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.send("Server")
})

app.listen(3000, function(){
    console.log("Server us runnin on port 3000");
})