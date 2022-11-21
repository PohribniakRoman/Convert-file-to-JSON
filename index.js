const path = require("path");
const express = require("express");
const uploader = require("express-fileupload");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(uploader());
app.use("/img",express.static(path.resolve(__dirname+"/")))

app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname+"/index.html"));
})

app.post("/send_file",(req,res)=>{
    const {file} = req.files;
    res.send(JSON.stringify(file.data)).status(200);
})

app.listen(PORT ,()=>{console.log(`Server has been started on port: ${PORT}...`);});

