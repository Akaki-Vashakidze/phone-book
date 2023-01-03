const { mongoose } = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:String,
    lastName:String,
    username:String,
    gmail:String,
    number:String,
    password:String
})

module.exports = mongoose.model('user',userSchema)