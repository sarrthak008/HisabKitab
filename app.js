
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
     res.render("index")
 })



 app.listen(PORT,()=>{
     console.log(`app listem on ${PORT}`);
 })