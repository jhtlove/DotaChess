
var express = require("express");
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token");
    res.header("Access-Control-Expose-Headers","*");
    // res.header("X-Powered-By",' 3.2.1')
    //res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get("/id/:name", function (request, response) {
    var heroName = request.params.name;
    debugger;
    // console.log("name:" + request.params.name);
    heros.find({name:heroName},function(err,heros){
      if(err) return console.error(err);
      response.send(heros);
    });
    
});

app.get("/id", function (request, response) {
    var heroName = request.query.name;  
    heros.find({name:heroName},function(err,heros){
      if(err) return console.error(err);
      response.send(heros);
    });
    
});

app.post("/hero", function (request, response) {
    console.log('post');
    var param = request.body;
    console.log("post param:" + JSON.stringify(param));
    const theHero = new heros(param);
    theHero.save(function (err, data) {
       if (err) return console.error(err);
       response.send("post:" + JSON.stringify(param));
    });
 
});   

app.listen(3000);
