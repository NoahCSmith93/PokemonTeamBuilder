// Dependencies
const express = require('express');
require('dotenv').config()

const Team = require('../models/team')
const checkLogin = require('../config/ensureLoggedIn')

const router = express.Router()

// Routes and Controllers

// Index
router.get("/", (req, res) => {
    Team.find({})
        .then(teams => {
            console.log("Found these teams", teams)
            res.render("teams/index", {teams, title: "Recent Teams"})
        })
        .catch(error => {
            console.log(error)
        })
})

// Edit

// Update

// New
router.get("/new", (req, res) => {
    res.render("teams/new", { title: "New Team" })
})
// Create

// Delete

// Show
router.get("/:id", (req, res) => {
    Team.findById(req.params.id)
        .populate('owner')
        .populate('comments.author')
        .then(team => {
            console.log("Found this team", team)
            res.render("teams/show", {team, title: team.name ? `${team.name}` : "Untitled Team"})
        })
})



// Export
module.exports = router;