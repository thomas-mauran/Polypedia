require("dotenv").config()


const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000


const server = http.createServer(app)

server.on("error", (error) => {
    console.log(error)
})

server.listen(port, () => {
    console.log(`API is up running here : http://${process.env.HOST}:${port}`)
}) 