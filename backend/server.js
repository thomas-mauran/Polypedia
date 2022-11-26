require("dotenv").config()

const http = require("http");
const app = require("./app");
const port = 3000


const server = http.createServer(app)

server.on("error", (error) => {
    console.log(error)
})

server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listenning on " + bind)
})

server.listen(port)