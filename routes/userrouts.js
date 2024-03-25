const routes=require("express").Router();
const usercontroller=require("../controller/UserController");
const userServices=require("../services/userservices");
const multer=require("multer");

const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage });

routes.post("/reg",usercontroller.register);
routes.post("/regUser",usercontroller.registerUser);
routes.post("/image",upload.single('image'),usercontroller.uploadimage);
routes.post("/login",usercontroller.login);
routes.get("/getimg",usercontroller.getImg);
routes.post("/getUserImg",usercontroller.getUserImg);

module.exports=routes;