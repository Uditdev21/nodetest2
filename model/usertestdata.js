const mongoos=require("mongoose");
const {Schema}=mongoos;
const db=require("../config/dbconfing");


const userSchema=new Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    }
})

const usertestModel=db.model("dating data test",userSchema);
module.exports=usertestModel;