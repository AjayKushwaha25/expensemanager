require('dotenv').config()  // needed to access database privately
const express = require('express'); // to create api
const mongoose = require('mongoose'); // interact with MongoDB
const cors = require('cors'); // pata hai terko

const app = express()
app.use(express.json())
app.use(cors())
console.log("check")


app.use('/user', require('./routes/userRouter'))

//Mongo Connection
const URI = process.env.MONGODB_URL
mongoose.connect(URI,{
    useCreateIndex: true, 
    useFindAndModify: false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}, (err: string) =>{//typescript
    if(err) throw err;
    console.log('Connected to MongoDB')
})


//create server
const PORT = process.env.PORT || 4200
app.listen(PORT,()=>{
    console.log('server is running on port', PORT)
})