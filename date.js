module.exports.getDate = function(){
  let today =new Date();
    let options = {
      weekday: "long",
      day : "numeric",
      month:"long"
    };
    return  today.toLocaleDateString("en-US", options);

}

module.exports.getDay = getDay;
function getDay(){
  let today =new Date();
    let options = {
      weekday: "long",
    };
    let day = today.toLocaleDateString("en-US", options);
    return day;
}
console.log(module.exports);
