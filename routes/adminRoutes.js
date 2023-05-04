const path = require("path");

const express = require("express");

const adminController = require("../controller/adminController")

const router = express.Router();

const Candie = require("../models/candies")

router.post("/candieStock", adminController.postAddProducts )

router.get("/candieStock",adminController.getAllProducts)

router.delete("/candieStock/:objId", adminController.postDeleteProduct)



router.get("/",adminController.getAddProductPage)

module.exports = router;