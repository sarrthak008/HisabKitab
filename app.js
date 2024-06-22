
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
           // console.log(files)
            res.render("index",{files:files})
         }
     })
 })

 app.get('/create',(req,res)=>{
       res.render('create')
 })

app.post('/createhisab',(req,res)=>{

    const   GetFileName=()=>{
        const date = new Date();
        let year = date.getFullYear()
        let  month = date.getMonth()
        let day = date.getDate()
           //readfile star
       return(`${year}-${month+1}-${day}`);
     }

     let fileName = GetFileName();
     let { tittle , content} = req.body;      

     fs.writeFile(`./hisabs/${tittle}.txt`,`${content}`,(err)=>{
         if(err){
            res.send(err);
         }else{
            res.redirect('/')
         }
     })

})

app.get('/delete/:filename',(req,res)=>{
    
     fs.unlink(`./hisabs/${req.params.filename}`,(err)=>{
        if(err){
            res.send(err);
        }else{
            res.redirect('/')
        }
     })
})

app.get('/showhisab/:fileName',(req,res)=>{
    let fileName = req.params.fileName;
    fs.readFile(`./hisabs/${fileName}`,"utf-8",(err,data)=>{
          if(err){
            res.send(err);
          }else{
            res.render("hisab",{data,fileName});
        
          }
    })
})

app.get('/edit/:fileName',(req,res)=>{
 
    let fileName = req.params.fileName;

     fs.readFile(`./hisabs/${fileName}`,"utf-8",(err,data)=>{
         if(err){
            res.status(500).send(err)
         }else{
             res.render("edit",{data,fileName})
         }
     })
})


app.post('/update/:fileName',(req,res)=>{
      let fileName = req.params.fileName;
      let newContent = req.body
      //console.log(newContent)
fs.writeFile(`./hisabs/${fileName}`,`${newContent.content}`,(err)=>{
     if(err){
         res.send(err)
     }else{
        res.redirect('/')
     }
}) 
    
})



 app.listen(PORT,()=>{
     console.log(`app listem on ${PORT}`);
 })