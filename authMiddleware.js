const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            error:'Token tidak ada'
        })
    }

    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(403).json({
            error:'Token tidak valid'
        })
    }
}

function authorizeRole(allowedRoles){
    return function(req, res, next) {
        const userRole = req.user.role;
        if(allowedRoles.includes(userRole)){
            next();
        }else {
            res.status(403).json({
                error:'Akses ditolak: tidak mempunyai role yang diperlukan'
            });
        }
    }
}

module.exports = {
    authenticateToken,
    authorizeRole,
}