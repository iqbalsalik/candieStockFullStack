const path = require("path");

const Candie = require("../models/candies");
const Users = require("../models/user")

exports.getAddProductPage = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"))
};


exports.postAddProducts = async (req, res, next) => {
    try {
        const name = req.body.candieName;
        const candieDescription = req.body.candieDescription;
        const quantity = req.body.quantity;
        const candie = req.user.createCandy({
                candieName: name,
                candieDescription: candieDescription,
                quantity: quantity
            })
        res.status(200).json({
            candieName: name,
            candieDescription: candieDescription,
            quantity: quantity,
            id: candie.id
        })
    } catch (err) {
        res.status(500).json("Something Went Wrong!!")
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await req.user.getCandies()
        res.status(200).json({
            products: products
        })
    } catch (err) {
        res.status(500).json("Something Went Wrong!!")
    }
}

exports.postDeleteProduct = async (req, res) => {
    try{
        const objId = req.params.objId;
        const candie = await Candie.findByPk(objId);
        const result = await candie.destroy()
        res.status(200).json(result)
    } catch{
        res.status(500).json("Something Went Wrong!!")
    }
}

exports.postPatchProduct = async (req, res) => {
    const objId = req.params.objId;
    try{
        await Candie.update({
            candieName: req.body.candieName,
            candieDescription: req.body.candieDescription,
            quantity: req.body.quantity
            
        },{
            where:{
                id:objId,
                userId:req.user.id
            }
        })
        res.status(200).json({
            candieName: req.body.candieName,
            candieDescription: req.body.candieDescription,
            quantity: req.body.quantity,
            id:objId
        })
    } catch{
        res.status(500).json("Something Went Wrong!!")
    }
}