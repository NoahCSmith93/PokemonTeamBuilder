const express = require('express');
const path = require('path');
const middleware = require('./config/middleware');
require('dotenv').config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

middleware(app)

app.get("/", (req, res) => {
    res.render("index")
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})