// Dependencies
const express = require('express');
require('dotenv').config()

const User = require('../models/user')
const checkLogin = require('../config/ensureLoggedIn')

const router = express.Router()

// Routes and Controllers

// Show
router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.render("user/show", { user, title: `${user.name}` })
        })
})


// Export
module.exports = router;