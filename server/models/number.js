const { mongoose } = require("mongoose")

const Schema = mongoose.Schema

const numberSchema = new Schema({
    number: String,
    name:String
})

module.exports = mongoose.model('number',numberSchema)