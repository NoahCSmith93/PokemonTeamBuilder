// Dependencies
const express = require('express');
require('dotenv').config()

const Team = require('../models/team')
const checkLogin = require('../config/ensureLoggedIn');
const ensureLoggedIn = require('../config/ensureLoggedIn');

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
        .then(team => {
            if (req.user.id == team.owner) {
                res.render("teams/edit", {
                    user: req.user,
                    title: "Add Or Change Pokemon In " + (team.name ? `${team.name}` : "Untitled Team"),
                    team
                })
            } else {
                res.send("something went wrong")
            }
        })
        .catch(err => {
            console.log(err)
        })
})

// Update
router.patch("/:id", checkLogin, (req, res) => {
    Team.findById(req.params.id)
        .then(team => {
            if (req.user.id == team.owner) {
                const editedMember = team.members.id(req.body.memberId)
                editedMember.name = req.body.name
                editedMember.species = req.body.species
                editedMember.ability = req.body.ability
                editedMember.moves = req.body.moves
                return team.save()
            } else {
                return
            }
        })
        .then((data) => {
            if (data) {
                res.redirect("back")
            } else {
                res.redirect("/error")
            }
        })
        .catch(err => {
            console.log(err)
        })
})

// Create Pokemon
router.post("/:id", checkLogin, (req, res) => {
    Team.findById(req.params.id)
        .then(team => {
            if (req.user.id == team.owner) {
                team.members.push(req.body)
                return team.save()
            } else {
                return
            }
        })
        .then((data) => {
            if (data) {
                res.redirect("back")
            } else {
                res.redirect("/error")
            }
        })
        .catch(err => {
            console.log(err)
        })
})

// New Team
router.get("/new", checkLogin, (req, res) => {
    res.render("teams/new", { user: req.user, title: "New Team" })
})

// Create Team
router.post('/', checkLogin, (req, res) => {
    req.body.owner = req.user.id
    Team.create(req.body)
        .then(team => {
            res.redirect(`/teams/${team._id}/edit`)
        })
        .catch(err => {
            console.log(err)
            res.redirect("/error")
        })
})

// Delete Confirmation
router.get("/:id/confirm", checkLogin, (req, res) => {
    Team.findById(req.params.id)
        .then(team => {
            if (req.user.id == team.owner) {
                res.render("teams/confirm", {
                    user: req.user,
                    team,
                    title: "Are you sure you want to delete " + (team.name ? team.name : "Untitled Team") + "?"
                })
            } else {
                res.redirect("/error")
            }
        })
        .catch(err => {
            console.log(err)
        })
})

// Delete
router.delete("/:id/delete", checkLogin, (req, res) => {
    Team.findById(req.params.id)
        .then(team => {
            if (req.user.id == team.owner) {
                 return team.deleteOne()
            } else {
                return
            }
        })
        .then(data => {
            if (data) {
                console.log("Here's the deleted data", data)
                res.redirect(`/users/${data.owner}`)
            } else {
                res.redirect("/error")
            }
        })
        .catch(err => {
            console.log(err)
        })
})

// Show
router.get("/:id", (req, res) => {
    Team.findById(req.params.id)
        .populate('owner')
        .populate('comments.author')
        .then(team => {
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

// if (req.user.id == team.owner) {
//
// } else {
//     res.redirect("/error")
// }