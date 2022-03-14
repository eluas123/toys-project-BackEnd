const mongoose = require("mongoose");
const Joi = require("joi");

const toysSchema = new mongoose.Schema({
    name: String,
    info: String,
    category: String,
    img_url: String,
    price: Number,
    user_id: String,
    date_created: {
        type: Date,
        default: Date.now()
    }
});

exports.toysModel = mongoose.model("toys", toysSchema);
exports.validtoys = (_bodyData) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        info: Joi.string().min(2).max(300),
        category: Joi.string().min(2).max(300),
        img_url: Joi.string().min(1).max(300),
        price: Joi.number().min(1).max(9999).required()
    })

    return joiSchema.validate(_bodyData);
}