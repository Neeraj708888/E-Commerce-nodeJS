const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        // console.log(token);
        jwt.verify(token, process.env.JWT_SEC, (err, user)=> {
            if(err) res.status(403).json("Token is not valid !");
            req.user = user;
            next()
        });
    } else {
        return res.status(401).json("You are not authenticate !");
    }
}

const verifyTokenAuthorization = (req, res, next)=> {
    verifyToken(req, res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to do that ! ");
        }
    });
}

const verifyTokenAdmin = (req, res, next)=> {
    verifyToken(req, res, ()=> {
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed !");
        }
    });
}
module.exports = {verifyToken, verifyTokenAuthorization, verifyTokenAdmin};