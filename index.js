const PORT = process.env.PORT || 5000;

const fs = require("fs");
const http = require("http");


const server = http.createServer((req,res)=>{
    fs.readFile("./index.html",(err,data)=>{
        res.end(data)
    })
})
server.listen(PORT ,()=>{console.log(`Server has been started on port: ${PORT}...`);});