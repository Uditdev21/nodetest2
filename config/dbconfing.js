const db=require("mongoose");

const connection=db.createConnection('mongodb+srv://uditkumar212006:Udit%409006306463@cluster0.lksw6fa.mongodb.net/dating')
.on('open',()=>console.log("mongodb connected"))
.on('error',()=>console.log("error not connected"));

module.exports=connection;

