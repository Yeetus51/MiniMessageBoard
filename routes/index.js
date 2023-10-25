const express = require('express');
const router = express.Router();
const mongoose = require("../mongoose.js");
const { Collection } = require('mongoose');


const Schema = mongoose.Schema;
const messageSchema = new Schema({
  user_id: {type: String, required: true, maxLength:100},
  message: {type: String, required: true, maxLength:10000},
  date: {type: Date}
})

const myModel = mongoose.model('messages', messageSchema); 


async function tryGetDocument(){
  try{
    let result = await myModel.findOne(); 
    console.log(result);
  }catch(err){
    //Yo mama
  }
}

async function tryAddDocument(user, content){
  try{
    let result = await myModel.insertMany({user_id:user, message:content, date:new Date()});
    return result; 
  }catch(err){

  }
}
tryGetDocument();

async function tryGetAllDocument(){
  try {
    let result = await myModel.find().sort({ date: -1 });
    
    for (let doc of result) {
        let plainDoc = doc.toObject();
        plainDoc.date = formatDate(doc.date);
        result[result.indexOf(doc)] = plainDoc;
    }

    return result;
  }catch(err){
    //yeet
  }
}

function formatDate(inputDate) {
  const parts = new Date(inputDate).toString().split(' '); 
  parts.shift(); // Removes the weekday
  return parts.slice(0, 4).join(' '); // Returns the next 4 items combined
}



/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    let result = await tryGetAllDocument(); 
    let messageUser = req.query.messageUser || '';
    res.render('index', { title: "Mini Messageboard", messages: result , messageUser: messageUser })
  }
  catch(err){

  }
});

router.get('/new', function(req, res, next) {
  res.render('form')
});

router.get("/", function(req, res, next) {
  let messageUser = req.query.messageUser || '';
  res.render('index', { messageUser: messageUser });
});

router.post("/", async function(req,res,next){
  const documentId = req.body.documentId;
  if(documentId){
    let result = await myModel.deleteOne({_id: new mongoose.Types.ObjectId(documentId)});
    //res.redirect(`/`);
  }else{
  console.log(req); 
  let messageText = req.body.messageText; 
  let messageUser = req.body.messageUser; 
  tryAddDocument(messageUser,messageText); 
  res.redirect(`/?messageUser=${messageUser}`);
  }
}); 



module.exports = router;



