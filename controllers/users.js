// Dependencies
const express = require('express');
require('dotenv').config()

const User = require('../models/user')
const Team = require("../models/team")
const checkLogin = require('../config/ensureLoggedIn')

const router = express.Router()

// Routes and Controllers

// Index
// only here to redirect from login
router.get("/", (req, res) => {
    res.redirect(`/users/${req.user._id}`)
})

// Show
router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            Team.find({ owner: user._id })
                .then(teams => {
                    console.log("Found these teams", teams)
                    res.render("users/show", { user: req.user, teams, user, title: `${user.name}`})
                })
        })
        .catch(err => {
            console.log(err)
            res.redirect("/error")
        })
})
    
// res.render("users/show", { user, title: `${username}` })

// Export
module.exports = router;