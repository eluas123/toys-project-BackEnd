require('dotenv').config();

exports.config = {
    userMongo: process.env.USER_DB,
    passMongo: process.env.PASS_DB,
    tokenSecret: process.env.TOKEN_SECRET
}