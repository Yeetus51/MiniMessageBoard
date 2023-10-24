const express = require('express');
const router = express.Router();
const mongoose = require("../mongoose.js");
const { Collection } = require('mongoose');

// const messages = [
//   {
//     text: "Hi there!",
//     user: "Amando",
//     added: new Date()
//   },
//   {
//     text: "Hello World!",
//     user: "Charles",
//     added: new Date()
//   }
// ];

const Schema = mongoose.Schema;
const messageSchema = new Schema({
  user_id: {type: String, required: true, maxLength:100},
  message: {type: String, required: true, maxLength:10000},
  date: {type: Date}
})

const myModel = mongoose.model('messages', messageSchema); 

async function tryGetDocument(){
  let result = await myModel.findOne(); 
}

async function tryAddDocument(user, content){
  let result = await myModel.insertMany({user_id:user, message:content, date:new Date()});
  return result; 
}
tryGetDocument();

async function tryGetAllDocument(){
  let result = await myModel.find().sort({date:-1}); 
  return result; 
}



/* GET home page. */
router.get('/', async function(req, res, next) {
  let result = await tryGetAllDocument(); 
  res.render('index', { title: "Mini Messageboard", messages: result })
});

router.get('/new', function(req, res, next) {
  res.render('form')
});

router.post("/new", function(req,res,next){

  console.log(req); 
  let messageText = req.body.messageText; 
  let messageUser = req.body.messageUser; 
  tryAddDocument(messageUser,messageText); 
  res.redirect('/');
}); 

router.post("/", function(req,res,next){
  res.redirect('/new');
}); 



module.exports = router;



