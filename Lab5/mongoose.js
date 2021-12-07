var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Admin:admin123@mydb.nllno.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
console.log("mongodb connect...")
module.exports=mongoose;