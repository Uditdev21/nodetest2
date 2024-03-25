const mongoos=require("mongoose");
const {Schema}=mongoos;
const db=require("../config/dbconfing");


const images=new Schema({
    imageData:{
        type:Buffer,
        require:true
    },
    imageName:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    uploaderName:{
        type:String,
        require:true
    },
    uploaderUID:{
        type:String,
        require:true
    }
})

const imagedata=db.model("images",images);
module.exports=imagedata;