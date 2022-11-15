const path = require("path");
const express = require("express");
const uploader = require("express-fileupload");
const fs = require("fs");
const Jimp = require("jimp");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(uploader());
app.use("/img",express.static(path.resolve(__dirname+"/")))

app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname+"/index.html"));
})

app.post("/send_file",(req,res)=>{
    const {file} = req.files;
    fs.writeFile("compressed_img",file.data,(err)=>{
        if(err) throw err;
    })    
    Jimp.read("compressed_img",(err,photo)=>{
        if(err) throw err;
        photo.resize(256,256).quality(100).write("compressed_img.jpg");
    })
    res.send(JSON.stringify({path:"compressed_img.jpg"})).status(200);
})

app.get("/compressed_img.jpg",(req,res)=>{
    res.sendFile(path.resolve(__dirname+"/compressed_img.jpg"))
})

app.listen(PORT ,()=>{console.log(`Server has been started on port: ${PORT}...`);});

