// Dependencies
const express = require('express');
require('dotenv').config()

const User = require('../models/user')
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
            res.render("users/show", { user, title: `${user.name}` })
        })
})


// Export
module.exports = router;