const express =require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const _ =require("lodash");

const app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-sushant:Preksha@98@cluster0-mv4j4.mongodb.net/todolistDB",  { useNewUrlParser: true , useUnifiedTopology: true});

const itemsSchema = ({
  name:String
});

const Item = mongoose.model("Item", itemsSchema)
const item1 =new Item({
  name : "welcome to the todolist."
});

const item2 =new Item({
  name : "hit the + button and add the new item"
});

const item3 =new Item({
  name : "<-- hit this to delete the item."
});

const defaultItems = [item1, item2, item3]

const listSchema = {
  name: String,
  items: [itemsSchema]
};
const List = mongoose.model("List",listSchema);

app.get("/", function(req, res){
  Item.find({}, function(err, foundItems){
    if(foundItems.length ===0){
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("success saved defaultItems");
        }
      });
        res.redirect("/");
    }else{
      res.render("list",{listTitle:"Today", newListItems:foundItems});
    }
  });

app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err,foundList){
    if(!err){
      if(!foundList){

          const list = new List({
            name:customListName,
            items: defaultItems
          });
        list.save();
      }else{
         res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  });
});

app.post("/", function(req,res){
  const itemName = req.body.newItem;
  const listName=req.body.list;
  const item = new Item({
    name: itemName
  });
  if(listName === "Today"){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name:listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    });
  }
});

app.post("/delete", function(req, res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    if (listName==="Today"){

      Item.findByIdAndRemove(checkedItemId, function(err){
        if(!err){
          console.log("we successfully deleted checked item.");
          res.redirect("/")
        }
      });
    }else{
      List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}},function(err, foundList){
        if (!err){
          res.redirect("/"+listName);
        }
      });
    }

});
});

var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 3000;
// }

// app.listen(port,function(){
//   console.log("server has started successfully.");
// });
