const express = require('express');
const path = require('path');
const middleware = require('./config/middleware');
require('dotenv').config();

const AuthRouter = require("./controllers/auth")
const TeamsRouter = require("./controllers/teams")
const UsersRouter = require("./controllers/users")

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

middleware(app)

app.get("/", (req, res) => {
    res.render("index", {title: "Main Page"})
})

app.use("/", AuthRouter)
app.use("/teams", TeamsRouter)
app.use("/users", UsersRouter)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

module.exports = app