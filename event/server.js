const express=require("express"); 
const app=express() 


const session=require("express-session"); 

app.use(
    session({
        secret:"secretcode",
        resave:false,
        saveUninitialized:true
    })
); 
app.use(flash()); 
app.listen(3000,()=>{
    console.log("server is listening to 3000"); 
})

app.get("/session",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;  
    console.log(req.session); 
    res.send(name)
})