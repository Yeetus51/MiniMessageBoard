const mongoose = require("mongoose"); 

mongoose.set("strictQuery",false); 

const mongoDB = process.env.MONGO_URI;

async function main() {
  try{
    let connection = await mongoose.connect(mongoDB); 
    console.log("Connected succseffully");
  }catch (err){
    console.log(`Connection Failed:${err}`); 
  }
}

main(); 

module.exports = mongoose; 