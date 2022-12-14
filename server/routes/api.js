

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Number = require('../models/number')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const number = require('../models/number');
const user = require('../models/user')

let ActiveUserName;

var mognoConnect = function () {
    mongoose.connect('mongodb+srv://vashaka29:lE7ajA5ySwDZY48p@cluster0.fc7ke.mongodb.net/nikkkkk?retryWrites=true&w=majority', { useNewUrlParser: true } ,function (err, db) {
      if (err) {
        console.log(err['message']);
        mognoConnect();
      } else {
        console.log("connected to mongoose");
      }
    });
  };
  
  mognoConnect();
  


router.get('/',(req,res) => {
    res.send('From Api route')
})


router.post('/register',(req,res) => {
    ActiveUserName = req.body.username;
    let userData = req.body;
    let user = new User(userData)
    user.save((error,registeredUser)=>{
        if(error) {
            console.log('errroooooorrrr' + error)
        } else {
          let payload = {subject:registeredUser._id}
          let token = jwt.sign(payload,'secretKey')
            res.status(200).send({token})
        }
    });
})

router.post('/addNumber',(req,res) => {
  let numbersData = req.body;
  let number = new Number(numbersData)
  number.save((error,addedNumber)=>{
      if(error) {
          console.log('errroooooorrrr' + error)
      } else {
          res.status(200).send(addedNumber)
      }
  });
})

router.post('/login', (req,res) => {
   ActiveUserName = req.body.username;
  let userData = req.body;
  User.findOne({username:userData.username}, (error,User)=> {
    if(error){
      console.log(error)
    } else {
      if(!User) {
        res.status(401).send('invalid name')
      } else
      if(User.password != userData.password) {
        res.status(401).send('Invalid password')
      } else {
        let payload = {subject:User._id}
        let token = jwt.sign(payload,'secretKey')
        res.status(200).send({token})
      }
    }
  })
})

router.post('/addnumbers',(req,res)=> {
  let Data = req.body
  User.findOneAndUpdate ({
   username:Data.userName
  },{
    $push:{
      numbers:Data.numberInfo
    }
  },(err) => (
    console.log(err)
  ))
})

router.post('/editNumbers',(req,res) => {
  let Data = req.body
  User.findOneAndUpdate ({
    username:Data.userName
   },{
     $push:{
       numbers:Data.numberInfo
     }
   },(err) => (
     console.log(err)
   ))
})

router.post('/deletenumber',(req,res) => {
  console.log(req.body)
  User.updateOne({
    username:req.body.username
   },{
     $set:{
       numbers:req.body.numbersArray
     }
   },(err) => (
     console.log(err)
   ))
})

router.get('/numbers',verifyToken,(req,res) => {
  let numbersArray
  User.find().then((result) => {
    result.map(item=>{
      if(item.username == ActiveUserName) {
        numbersArray = item.numbers
      }
    })

  res.send(numbersArray)
  }).catch(err=>{
    console.log(err)
  })
})

function verifyToken(req,res,next){
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1];
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token,'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}

module.exports = router