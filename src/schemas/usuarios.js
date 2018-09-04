const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/tumer')
const user_schema = new Schema({
    name: {type: String, required: true, maxlength: 20, minlength: 3},
    last_name: {type: String, required: true, maxlength: 30, minlength: 4},
    username: {type: String, required: true, unique:true, maxlength: 30, minlength: 4},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, maxlength: 60, minlength: 8}
})

const User = mongoose.model('User', user_schema)

module.exports.User = User