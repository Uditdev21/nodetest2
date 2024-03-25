const express=require("express");
const routes=require("./routes/userrouts");
const bodyParser=require("body-parser");
const multer = require("multer");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/",routes);

module.exports=app;
