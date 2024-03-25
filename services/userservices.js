// const imagedata = require("../model/usermodel");
const usermodel=require("../model/usermodel");
const userLoginModel=require("../model/userLoginmodel");
const usertestModel=require("../model/usertestdata");
const userIamegModel = require("../model/userImageUploades");

class userServices{
    static async createdata(firstname,lastname){
        try{
            const createUser=new usertestModel({firstname,lastname});
            await createUser.save(); // Use await directly within the function
            return createUser;
            
        }catch(err){
            throw err;
        }
    }

    static async createUser(Name,DOB,UID,password,gender,ImageList){
        try {
            const existingUser = await userLoginModel.findOne({UID:UID});
            if (existingUser) {
                return null;
            }
            const newUser = new userLoginModel({ Name, DOB, UID, password ,gender});
            const newDataUser = new userIamegModel({ Name, DOB, UID, password ,gender,ImageList});
            await newDataUser.save();
            return await newUser.save();
        }catch(error){
            throw error;
        }
    }
    
    static async login(UID,password){
        try {
            const checkdata=await userLoginModel.findOne({UID:UID,password:password});
            if(checkdata){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            throw error
        }

    }

    static async uploadImg(imageData,imageName,uploaderUID,gender,uploaderName){
        try {
            
                const newImage = new usermodel({
                    imageName,
                    imageData,
                    gender,
                    uploaderUID,
                    uploaderName        // Save the image data
                });
                await newImage.save();
                userIamegModel.findOneAndUpdate(
                    { UID: uploaderUID },
                    { $push: { ImageList: { imageName, imageData } } },
                    { upsert: true } // Create if absent
                  )
                  .then(user => {
                    if (user) {
                      console.log(`Image uploaded for user: ${user.UID}`);
                    } else {
                      console.log(`No user found with email: ${uploaderUID}`);
                    }
                  })
                  .catch(error => {
                    console.error('Error uploading image:', error);
                  });
          } catch (error) {
            throw error;
          }
    }

    static async getImg() {
        try {
            const images = await usermodel.find({});
            const base64Images = images.map((image) => {
                const base64Data = image.imageData.toString('base64');
                return {
                    imageName: image.imageName,
                    base64Data,
                };
            });
            return base64Images;
        } catch (error) {
            console.error('Error fetching images:', error.message);
            throw error;
        }
    }
    
    static async getUserImg(UID){
        try {
            const imagesList=await userIamegModel.findOne({UID:UID});
            const imageListCount=imagesList.ImageList.length;
            const base64Images = imagesList.ImageList.map((image) => {
                const base64Data = image.imageData.toString('base64');
                return {
                    imageName: image.imageName,
                    base64Data,
                };
            });
            // console.log(base64Images);
            return base64Images;

            
        } catch (error) {
            throw error;
        }
    }
}    

module.exports=userServices;