const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // tokens:[
    //     {
    //         token:{
    //             type:String,
    //             required:true
    //         }
    //     }
    // ]
});
//generating token
// userSchema.methods.generateAuthToken = async function(){
//     try {
//         let tokenharsh = jwt.sign({_id:this._id},process.env.SECRET_KEY);
//         this.tokens=this.tokens.concat({token:tokenharsh});
//         await this.save();
//         return tokenharsh;
//     } catch (error) {
//         console.log(error)
//     }
// }


const User = mongoose.model('USER',userSchema)

module.exports = User;