const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    try{
        const token = req.headers.authorization
        console.log(token)
        console.log("token")
        const decodedToken = await jwt.verify(token, process.env.JWT_TOKEN_KEY)
        const userId = decodedToken.userId

        req.auth = { userId}

        if(req.body.userId && req.body.userId !== userId){
            console.log("Id non valable")
            res.status(500).send({error: "Internal server error"})
        }else{
            next()
        }
    }catch(error){
        res.status(401).json({ error: "requete non authentified !" });    }
}