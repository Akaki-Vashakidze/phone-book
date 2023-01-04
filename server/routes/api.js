

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Number = require('../models/number')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const number = require('../models/number');



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
  let userData = req.body;
  console.log(userData)
  User.findOne({username:userData.userName}, (error,User)=> {
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
        res.status(200).send(token)
      }
    }
  })
})

router.get('/numbers',(req,res) => {
  let numbersList = [
    {"name":"akaki",
     "number":"598780075"},
     {"name":"nika",
     "number":"598780084"},
     {"name":"gio",
     "number":"598755275"},
     {"name":"zura",
     "number":"598780075"},
     {"name":"lasha",
     "number":"597473645"},
  ]
  res.json(numbersList)
})

module.exports = router