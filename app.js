const express =require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");
// console.log(date);
let items =["Buy Food","Cook Food","Eats Food",];
let workItems=["mongno"];

const app =express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
let day = date.getDate();
  res.render("list",{listTitle:day, newListItems:items});

});
app.post("/", function(req,res){
  console.log(req.body);
  let item = req.body.newItem;
  console.log(item);
  console.log(req.body.list);
  if(req.body.list==="Work List"){
    console.log(req.body.list);
    workItems.push(item);
    res.redirect("/work");
  }else{
    // console.log(req.body);

    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res){
  res.render("list",{listTitle:"Work List", newListItems:workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

// app.post("/work", function(req, res){
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// });

app.listen(3000,function(){
  console.log("server is running on port 3000");
});
