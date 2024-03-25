const mongoos=require("mongoose");
const {Schema}=mongoos;
const db=require("../config/dbconfing");

const userImage=new Schema({
    Name:{
        type:String,
        require:true,
    },
    DOB:{
        type:String,
        require:true,
    },
    UID:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    gender:{
        type:String,
        require:true,
    },
    ImageList:{
        type:Object,
        require:true
    }
});

const userIamegModel=db.model("userIamges",userImage);

module.exports=userIamegModel;