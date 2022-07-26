const express = require('express')
const app = express()
const homepageRouter = require('./routes/homepage')
const exerciseRouter = require('./routes/Exercises')
const userRouter = require('./routes/User')
const mongoose = require('mongoose');
const BodyParser = require('body-parser')
require('dotenv').config();



app.use(express.json())
app.use(BodyParser.json())


app.use('/',homepageRouter)
app.use('/exercises',exerciseRouter)
app.use('/user',userRouter)
try{mongoose.connect("mongodb+srv://duyvu:happyfit@happyfit.zucuyku.mongodb.net/test?retryWrites=true&w=majority",
    ()=>{console.log('Connected to DB!')
    })}
catch(err){
    res.json({message:err});
}

app.listen(3000)