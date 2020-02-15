const express =require("express");
const app = express();
app.get("/:sp", function(req, res){
  res.send(req.params);
  console.log(req.params);
});

app.listen(3000,function(){
  console.log("server is running on port 3000");
});
