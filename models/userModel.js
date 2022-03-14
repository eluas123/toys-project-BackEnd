const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String,
    role: {
        type: String,
        default: "user"
    },
    date_created: {
        type: Date,
        default: Date.now()
    }
});

exports.UserModel = mongoose.model("users", userSchema);

exports.genToken = (_userId) => {
        let token = jwt.sign({ _id: _userId }, `${config.tokenSecret}`, { expiresIn: "60mins" });
        return token;
    }
    /// USER
exports.validUser = (_bodyData) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        email: Joi.string().min(2).max(300).required().email(),
        pass: Joi.string().min(3).max(100).required()

    })

    return joiSchema.validate(_bodyData);
}

///LOGIN

exports.validLogin = (_bodyData) => {
    let joiSchema = Joi.object({
        email: Joi.string().min(2).max(300).required().email(),
        pass: Joi.string().min(3).max(100).required()

    })

    return joiSchema.validate(_bodyData);
}