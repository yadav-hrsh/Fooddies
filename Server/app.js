const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json())


require('./db/conn.js')
app.use(require('./router/Routers.js'))







app.use(cors())


app.listen(5000,()=>{
    console.log("server running at port 5000" );
})