const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
 
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));   
app.use(express.json());

app.use(express.static(path.join(__dirname,"/public")));    
app.set("views",path.join(__dirname,"/views")); 
app.set("view engine","ejs");   

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
});
app.get("/",(req,res)=>{
    res.send("Server Working");
});

let posts=[
    {
        id:uuidv4(),
        username: "susmit",
        content: "profession being a batman",
    },
    {
        id:uuidv4(),
        username: "rudra",
        content: "part time friend, full time bobblemon",
    },
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("show.ejs",{post});
}); 

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let content=req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=content;
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id !==p.id);
    res.redirect("/posts");
});
