const express = require('express')
const router = express.Router()
const nutrition = require('../models/Nutrition')

router.get('/', async (req,res)=>{
    try
    {
    const food =await nutrition.find()
    res.json(food)}
    catch(err)
    {console.log(food)}
})


router.get('/:id',async (req,res)=>{
    try{
        const food = await nutrition.findById(req.params.id);
        res.json(food)
    }
    catch(err){
        res.json({message:err})
    }
    
})

router.post('/',(req,res)=>{
    const food = new nutrition({
        name:req.body.name,
        type: req.body.type,
        macroNutrient: req.body.macroNutrient,
        microNutrient:req.body.microNutrient,
        calorie:req.body.calorie
    })

    food.save()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json({message:err})
    })
})
router.patch('/:id', async (req,res)=>{
    try
    {const updatedFood = await nutrition.updateOne({_id:req.params.id},{$set:{
        name:req.body.name,
        description: req.body.description,
        tip: req.body.tip,
        difficulty: req.body.difficulty,
        videoURL:req.body.videoURL 
    }})
    res.json(updatedFood)}
    catch(err)
    {
        res.json({message: err})
    }


})

router.delete('/:id', async (req,res)=>{
    try{
        const deletedFood = await nutrition.remove({_id:req.params.id})
        if (deletedFood.acknowledged==true){
            res.send("Success")
        }}

    catch(err){
        res.json({message:err})
    }
})


module.exports = router