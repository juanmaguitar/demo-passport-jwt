var jwt = require('jsonwebtoken')

function googleCallback(req, res) {

    const SECRET = process.env.SECRET
    const id = req.user.id || req.user._id

    const token = jwt.sign( { id }, SECRET )
    const Location = `/#!/login?token=${token}`
    res.writeHead(302, { Location })
    res.end();

}

module.exports = googleCallback