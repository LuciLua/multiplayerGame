const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    x: {
        type: String,
        required: false
    },
    y: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    }
}) 

const User = mongoose.model('user', userSchema)
module.exports = User