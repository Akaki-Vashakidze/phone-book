const { mongoose } = require("mongoose")
const { array } = require("mongoose/lib/utils")

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:String,
    lastName:String,
    username:String,
    gmail:String,
    number:String,
    password:String,
    numbers:Array
})

module.exports = mongoose.model('user',userSchema)