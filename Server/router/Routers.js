const express = require('express');
const router = express.Router();
const User = require("../model/userSchema");
const {userController} = require('../controller/userController.js');

router.post('/api/register',userController.register)
router.post('/api/login',userController.login)
router.get('/api/Home',userController.Home)

router.post('/api/addTocart',userController.AddToCart)
router.get('/api/getCartdata:email',userController.GetCartData)
router.get('/api/getorderdata:email',userController.GetOrderData)

router.post('/api/deleteCartdata',userController.deletecartdata)
router.post('/api/deleteorderdata',userController.deleteorderdata)
router.post('/api/orderProduct',userController.orderProduct)

module.exports = router;