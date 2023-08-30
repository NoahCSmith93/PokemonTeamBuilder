const mongoose = require("mongoose")
const Schema = mongoose.Schema

const pokemonSchema = new Schema({
    name: String,
    species: {
        type: String,
        required: true
    },
    ability: {
        type: String,
    },
    moves: [String]
})

const commentSchema = new Schema ({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true
    }
})

const teamSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    members: [pokemonSchema],
    description: String,
    comments: [commentSchema],
    rating: Number
}, {
    timestamps: true
})

module.exports = mongoose.model("Team", teamSchema)