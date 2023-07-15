const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    item:{
        type:Object,
        required:true
    }
})

const Cartitem = mongoose.model('Cartitem',cartSchema)

module.exports = Cartitem;