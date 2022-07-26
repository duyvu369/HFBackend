const mongoose = require('mongoose')

const ExerciseSchema = mongoose.Schema({
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
    {collection:'exercises'}
)

module.exports = mongoose.model('Exercise',ExerciseSchema)