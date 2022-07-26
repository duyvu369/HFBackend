const express = require('express')
const auth = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()
auth.use(express.json())
const users = require('../models/User')
const bcrypt = require('bcryptjs')



auth.post('/login', async (req,res)=>{
    const { username, password} = req.body
    const user = await users.findOne({ username,password}).lean()
    if(!user){
        return res.json({status: 'error', error: 'Wrong username/password!'})
    }
    else {
    const token = generateToken(user)
    const refreshTok = jwt.sign(user, process.env.SECRET_REFRESH_TOKEN)
    res.json({accessToken:token, refreshToken:refreshTok})
    console.log(user)
}})


auth.delete('/signout', (req,res)=>{
})


function generateToken(user){
    return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '15m' })
}

module.exports = auth