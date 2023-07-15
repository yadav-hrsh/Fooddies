const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    item:{
        type:Object,
        required:true
    },
    counter:{
        type:Number,
        required:true
    },
    time:{
        type:Date,
        default: Date.now()
    }
})

const orderitem = mongoose.model('orderitem',orderSchema)

module.exports = orderitem;