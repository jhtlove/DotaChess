
var express = require("express");
var app = express.createServer();


app.get("/", function (request, response) {
    response.send("Welcome!");
});




// connect mongodb 
var mongoose = require("mongoose");   //需要提前使用npm安装mongodb
 
var url = "mongodb://127.0.0.1:27017/mongo";   //mongo是我的数据库
var db = mongoose.connect(url,function(err){
	if(err){
		console.log('Cound not connect to mogo');
	}else{
		console.log("success connect"); // 连接成功
		const query = new mongoose.Query();
		quert.setOptions({price:1});
	}
}
);                     //连接数据库

var schema = mongoose.Schema, objectId = schema.ObjectId;
var kittySchema = new mongoose.Schema({name:String});
var kitten = mongoose.model('kitten',kittySchema);


app.get("/hero/:id", function (request, response) {
    var id = request.params.id;
    console.log(id);

    db.heros.findOne({ "name": +id }, function (error, doc) {
        if (error) return next(error);
        response.json(doc);
    });
});

 app.listen(3000);
