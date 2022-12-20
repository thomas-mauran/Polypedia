const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./user/routes")
const bookRoutes = require("./book/routes")
const authorRoutes = require("./author/routes")
const tagRoutes = require("./tag/routes")
const languageRoutes = require("./language/routes")

// db connect

const app = express();

app.use(express.json())

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
})

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

//Using the routes

//app.use("/api/auth", userRoutes);
// app.use("/api/question", questionRoutes)

app.use("/user/", userRoutes)
app.use("/book/", bookRoutes)
app.use("/author/", authorRoutes)
app.use("/tag/", tagRoutes)
app.use("/language/", languageRoutes)

app.get("/", (req, res) => {
    res.send("Server is up")
})

module.exports = app
