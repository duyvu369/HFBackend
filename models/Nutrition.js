const mongoose = require('mongoose')

const NutritionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,   
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    category: Array,
    tip: String,
    videoURL: {
        type: String,
        required: true
    }},
    {collection:'nutrition'}
)

module.exports = mongoose.model('Nutrition',ExerciseSchema)