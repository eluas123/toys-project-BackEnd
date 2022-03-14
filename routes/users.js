const express = require("express");
const bcrypt = require("bcrypt");
const { authToken } = require("../auth/authToken");
const { UserModel, validUser, validLogin, genToken } = require("../models/userModel");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ msg: "Users work *****" });
})

router.get("/authUser", authToken, async(req, res) => {
    res.json({ status: "ok", msg: "token valid" });
})

router.get("/userInfo", authToken, async(req, res) => {
    try {
        let data = await UserModel.findOne({ _id: req.tokenData._id }, { pass: 0 });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//POST
router.post("/", async(req, res) => {
    let validBody = validUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let user = new UserModel(req.body);
        user.pass = await bcrypt.hash(user.pass, 10);
        await user.save();
        user.pass = "******";
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json({ err: "Email alreay in system or there another problem" });
    }
});


////POST LOGIN
router.post("/login", async(req, res) => {
    let validBody = validLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ msg: "User/Email not found" });
        }
        let passValid = await bcrypt.compare(req.body.pass, user.pass);
        if (!passValid) {
            return res.status(401).json({ msg: "password wrong" });
        }
        let token = genToken(user._id);
        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router;