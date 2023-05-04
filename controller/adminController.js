const path = require("path");

const Candie = require("../models/candies");

exports.getAddProductPage = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"))
};


exports.postAddProducts = async (req, res, next) => {
    try {
        const name = req.body.candieName;
        const candieDescription = req.body.candieDescription;
        const quantity = req.body.quantity;
        const id = req.user.id
        const candie = await Candie.create({
            candieName: name,
            candieDescription: candieDescription,
            quantity: quantity,
            userId: id
        })

        res.status(200).json({
            candieName: name,
            candieDescription: candieDescription,
            candieDescription: quantity,
            id: candie.id
        })
    } catch (err) {
        res.status(500).json("Something Went Wrong!!")
    }
}

exports.getAllProducts = async(req,res)=>{
    try{
        const products = await req.user.getCandies()
        res.status(200).json({
         products:products
        })
    } catch(err){
        res.status(500).json("Something Went Wrong!!")
    }
}

exports.postDeleteProduct = async (req,res)=>{
    const objId = req.params.objId;
    const candie =await Candie.findByPk(objId);
     const result = await candie.destroy()
    res.status(200).json(result)

}