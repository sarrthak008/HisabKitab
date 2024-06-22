
const { log } = require('console');
const express = require('express');
const app = express ();
const PORT = process.env.PORT || 3000
const fs = require('fs');
const path = require('path')
 
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))

 app.get('/',(req,res)=>{
     fs.readdir(`./hisabs`,(err,files)=>{
         if(err){
            res.send(err);
         }else{
            console.log(files)
            res.render("index",{files:files})
         }
     })
 })

 app.get('/create',(req,res)=>{
       res.render('create')
 })

app.post('/createhisab',(req,res)=>{

    const  GetFileName=()=>{
        const date = new Date();
        let year = date.getFullYear()
        let  month = date.getMonth()
        let day = date.getDate()
       return(`${year}-${month+1}-${day}`);
     }
     const filenName = GetFileName();
     let { tittle , content} = req.body;

     fs.writeFile(`./hisabs/${tittle}.txt`,`${content}`,(err)=>{
         if(err){
            res.send(err);
         }else{
            res.redirect('/')
         }
     })

})



 app.listen(PORT,()=>{
     console.log(`app listem on ${PORT}`);
 })