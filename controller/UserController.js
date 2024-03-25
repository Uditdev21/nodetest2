const userServices=require("../services/userservices");
const userLoginModel=require("../model/userLoginmodel");

exports.register=async(req,res,next)=>{
    try{
        const{firstname,lastname}=req.body;
        console.log(req.body);
        const successRes=await userServices.createdata(firstname,lastname);
        res.json({status:"uploded"})
    }catch(error){
        throw error
    }
}

exports.registerUser=async(req,res,next)=>{
    try{
        const{Name,DOB,UID,password,gender}=req.body;
        const emailExist=await userLoginModel.findOne({UID:UID});
        if(emailExist){
            return res.json({status:"email has been already regeistred"});
        }else{
            const image=[]
          const usercreated=await userServices.createUser(Name,DOB,UID,password,gender,image);
          console.log(req.body);
          return res.json({
            status:"new Account created"
        })};
    }catch(err){
        throw err;
    }
}

exports.login=async(req,res)=>{
    try {
        const {UID,password}=req.body;
        const exitinguser=await userServices.login(UID,password);
        console.log(req.body);
        if(exitinguser==true){
            res.json({
                status:"logedin"
            })
        }else{
            res.json({
                status:"user does not exist"
            })
        }
        
    } catch (error) {
        throw error
    }
}

exports.uploadimage=async(req,res,next)=>{
    try{
        // const{imaagedata}=req.file.buffer;
        const{imageName,UID,gender,Name}=req.body;
        const uploadsucc= await userServices.uploadImg(req.file.buffer,imageName,UID,gender,Name);
        console.log("this in controlle data")
        console.log(req.file.buffer);
        console.log(UID);
        res.json({
            status:"upload complete"
        })
    }catch(err){
        throw err;
    }
}

exports.getImg = async (req, res) => {
    try {
        const img = await userServices.getImg();
        // console.log("getimg");
        // const processedImages = img.map((element) => {
        //     return element;
        // });
        res.json(img);
    } catch (error) {
        // Handle any errors appropriately
        console.error('Error fetching images:', error);
        res.status(500).send('Internal server error');
    }
};

exports.getUserImg=async(req,res)=>{
    try {
        const {UID}=req.body;
        const user=await userServices.getUserImg(UID);
        console.log(UID);
        res.json(user);
    } catch (error) {
        throw error;
    }
}
