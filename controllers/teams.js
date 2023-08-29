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
            res.redirect("/error")
        })
})

// Edit
router.get("/:id/edit", checkLogin, (req, res) => {
    Team.findById(req.params.id)
        .populate('owner')
        .populate('comments.author')
        .then(team => {
            res.render("teams/edit", {
                user: req.user,
                title: "Add Or Remove Pokemon In " + (team.name ? `${team.name}` : "Untitled Team"),
                team
            })
        })
        .catch(err => {
            console.log(err)
            res.redirect("/error")
        })
})

// Update

// New
router.get("/new", checkLogin, (req, res) => {
    res.render("teams/new", { user: req.user, title: "New Team" })
})

// Create
router.post('/', checkLogin, (req, res) => {
    req.body.owner = req.user._id
    Team.create(req.body)
        .then(team => {
            res.redirect(`/teams/${team._id}/edit`)
        })
        .catch(err => {
            console.log(err)
            res.redirect("/error")
        })
})

// Delete

// Show
router.get("/:id", (req, res) => {
    Team.findById(req.params.id)
        .populate('owner')
        .populate('comments.author')
        .then(team => {
            console.log("Found this team", team)
            res.render("teams/show", {
                user: req.user,
                title: team.name ? `${team.name}` : "Untitled Team",
                team
            })
        })
        .catch(err => {
            console.log(err)
            res.redirect("/error")
        })
})



// Export
module.exports = router;