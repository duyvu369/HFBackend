const express = require('express')
const router = express.Router()
const exercise = require('../models/Exercise')
require('dotenv').config()
const jwt = require('jsonwebtoken')

//Show all exercises
router.get('/', async (req,res)=>{
    try
    {
    const workout =await exercise.find()
    res.json(workout)}
    catch(err)
    {console.log(workout)}
})

//Show a specific exercise
router.get('/:id',async (req,res)=>{
    try{
        const workout = await exercise.findById(req.params.id);
        res.json(workout)
    }
    catch(err){
        res.json({message:err})
    }
    
})
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }
  
//Create one exercise
router.post('/',authenticateToken,(req,res)=>{
    const workout = new exercise({
        name:req.body.name,
        description: req.body.description,
        tip: req.body.tip,
        difficulty: req.body.difficulty,
        category:req.body.category,
        videoURL:req.body.videoURL
    })

    workout.save()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json({message:err})
    })
})

//Update one exercise
router.patch('/:id',authenticateToken,(req,res)=>{
    try
    {const updatedExercise = exercise.updateOne({_id:req.params.id},{$set:{
        name:req.body.name,
        description: req.body.description,
        tip: req.body.tip,
        difficulty: req.body.difficulty,
        videoURL:req.body.videoURL 
    }})
    res.json(updatedExercise)}
    catch(err)
    {
        res.json({message: err})
    }


})

//Delete one exercise
router.delete('/:id',authenticateToken, async (req,res)=>{
    try{
        const workout = await exercise.remove({_id:req.params.id})
        if (workout.acknowledged==true){
            res.send("Success")
        }}

    catch(err){
        res.json({message:err})
    }
})

//Filter exercise by name
router.get('/filterByName/:name', async (req,res)=>{
    try
    {
    const workout = await exercise.find({name:req.params.name})
    res.json(workout)
}
    catch(err)
    {console.log(workout)}
})

//Filter exercise by category
router.get('/filterByCategory/:cat', async (req,res)=>{
    try
    {
    const workout = await exercise.find({category:req.params.cat})
    res.json(workout)
}
    catch(err)
    {console.log(workout)}
})

//Filter exercise by difficulty
router.get('/filterByDifficulty/:dif', async (req,res)=>{
    try
    {
    const workout = await exercise.find({difficulty:req.params.dif})
    res.json(workout)
}
    catch(err)
    {console.log(workout)}
})

module.exports = router