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
        .catch(err => {
            console.log(err)
            res.redirect(`/users/${req.user._id}`)
        })
})

// Edit
router.get("/:id/edit", checkLogin, (req, res) => {
    Team.findById(req.params.id)
        .populate('owner')
        .populate('comments.author')
        .then()
        .catch(err => {
            console.log(err)
            res.redirect(`/users/${req.user._id}`)
        })
})

// Update

// New
router.get("/new", checkLogin, (req, res) => {
    res.render("teams/new", { user: req.user, title: "New Team" })
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
            res.render("teams/show", { user: req.user, team, title: team.name ? `${team.name}` : "Untitled Team"})
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/users/${req.user._id}`)
        })
})



// Export
module.exports = router;