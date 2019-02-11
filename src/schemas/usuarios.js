const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const user_schema = new Schema({
    name: {type: String, required: true, maxlength: 20, minlength: 2},
    last_name: {type: String, maxlength: 30, minlength: 2},
    username: {type: String, required: true, unique:true, maxlength: 30, minlength: 4},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, maxlength: 100, minlength: 8},
    type: {type: Number, required: true}
})

user_schema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
user_schema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}
const User = mongoose.model('User', user_schema)

module.exports.User = User