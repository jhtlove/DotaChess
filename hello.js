
var express = require("express");
var app = express();

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/hero',{config:{autoIndex:false}});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connection success");
});


var heroSchema = new  mongoose.Schema({
  name:String,
  race:[String],
  price:Number
});
heroSchema.set('autoIndex',false);

heroSchema.methods.display = function () {
  var msg = this.name + ":" + this.race.join(",") + ":" + this.price;   
  console.log(msg);
}

var heros = mongoose.model('heros', heroSchema);


// Kitten.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log('find all: ' + kittens);
// }) 

// Kitten.find({ name: 'Silence' }, function (err, kittens) {
//   if (err) return console.error(err);
//   console.log("find Silence:" + kittens);
// });

app.get("/", function (request, response) {
    heros.find({name:'斧王'},function(err,heros){
      if(err) return console.error(err);
      response.send(heros);
    });
    
});

app.get("/hero/:theHero", function (request, response) {
    var theHero = request.params.theHero;
    theHero.save(function (err, fluffy) {
    if (err) return console.error(err);
  });
 
});   

 app.listen(3000);
