const express = require("express");
const { authToken } = require("../auth/authToken");
const { products_ar } = require("../jsons/toysData");
const { toysModel, validtoys } = require("../models/toysModel");
const router = express.Router();

router.get("/", async(req, res) => {
    try {
        let perPage = req.query.perPage || 10;
        let page = req.query.page || 1;
        let data = await toysModel.find({})
            .limit(perPage)
            .skip((page - 1) * perPage)
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg_err: "There problem in server try again later" })
    }
})


////toys/cat?category=humans get list by category 
router.get("/cat", (req, res) => {
        let categoryQ = req.query.category;
        let temp_ar = products_ar.filter(item => {
            return item.category == categoryQ;
        })
        res.json(temp_ar);
    })
    /////toys/search?s=power get list by name or info
router.get("/search", async(req, res) => {
        try {
            let searchQ = req.query.s;
            let searchReg = new RegExp(searchQ, "i");
            let data = await toysModel.find({ $or: [{ name: searchReg }, { info: searchReg }] })
                .limit(20)
            res.json(data);
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "There problem in server try again later" });
        }
    })
    ///POST
router.post("/", authToken, async(req, res) => {
    let validBody = validtoys(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let toys = new toysModel(req.body);
        toys.user_id = req.tokenData._id;
        await toys.save();
        res.json(toys);
    } catch (err) {
        console.log(err);
    }
});

///EDIT
router.put("/:idEdit", authToken, async(req, res) => {
    let validBody = validtoys(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let idEdit = req.params.idEdit;
        ///CHECKING THE |ID| OF THE TOY AND TOKEN USER BEFORE EDIT
        let data = await toysModel.updateOne({ _id: idEdit, user_id: req.tokenData._id }, req.body);
        ////if its success => modfiedCount:1
        res.json(data);
    } catch (err) {
        console.log(err);
    }
})

///DELETE
router.delete("/:idDel", authToken, async(req, res) => {
    try {
        let idDel = req.params.idDel;
        ///CHECKING THE |ID| OF THE TOY AND TOKEN USER BEFORE DELETE
        let data = await toysModel.deleteOne({ _id: idDel, user_id: req.tokenData._id });
        res.json(data);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;