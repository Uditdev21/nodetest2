const app=require("./app");
const db=require("./config/dbconfing")

const port = 3000||process.env.port;

app.listen(port,()=>console.log(`server is running on http://localhost:${port}`));

app.get('/',(req,res)=>
    res.send("this is op home")
)