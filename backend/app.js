const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./user/routes")
const bookRoutes = require("./book/routes")

// db connect

const app = express();

app.use(express.json())

app.use((req,res,next) => {
    res.setHeader('Acces-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
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

app.use("/user", userRoutes)
app.use("/book/", bookRoutes)
app.get("/", (req, res) => {
    res.send("Server is up")
})

module.exports = app
