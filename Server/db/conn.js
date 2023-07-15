const mongoose = require('mongoose');

const db = "mongodb://localhost:27017/foodies";

mongoose.set('strictQuery', true);
mongoose.connect(db).then(()=>{
    console.log("connected")
}).catch((error)=>{
    console.log(error)
})