const express = require("express")
require("dotenv").config()
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session")
const passport = require("passport")
const methodOverride = require("method-override");
require("./passport")

function middleware(app) {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(methodOverride("_method"))

    // This sets up our session so passport can use it
    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    app.use((req, res, next) => {
        res.locals.user = req.user
        next()
    })
}

module.exports = middleware