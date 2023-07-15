const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/userSchema");
const Cartitem = require("../model/cartSchema");
const orderitem = require("../model/orderSchema");

class userController {

  static register = async (req, res) => {
    console.log(req.body);
    const { name, username, email, phone, password, cpassword } = req.body;
    if (
      !name ||
      !username ||
      !email ||
      !phone ||
      !password ||
      !cpassword ||
      cpassword !== password
    ) {
      return res.status(422).json({ error: "invalid data" });
    }

    try {
      const userExit = await User.findOne({ email: email });
      if (userExit) {
        return res.status(422).json({ error: "already registered user" });
      }
      const spassword = await bcrypt.hash(password, 10);
      const copassword = await bcrypt.hash(cpassword, 10);

      const data = new User({
        name: name,
        username: username,
        email: email,
        phone: phone,
        password: spassword,
      });
      const savedata = await data.save();
      console.log(savedata);
      if (savedata) {
        res.status(201).json({ message: "successfully registered User" });
      } else {
        res.status(500).json({ error: "registration failed" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(522).json({ error: "invalid data" });
    }
    try {
      const data = await User.findOne({ email: email });
      if (data != null) {
        const hashcompare = await bcrypt.compare(password, data.password);

        if (hashcompare) {
          return res.status(201).json({ message: data });
        } else {
          return res.status(422).json({ error: "invalid data" });
        }
      } else {
        return res.status(422).json({ error: "plz complete data" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static AddToCart = async (req, res) => {
    console.log("data come to db");
    const {email,item} = req.body;
    try {
      const userExit = await Cartitem.findOne({ item: req.body });
      console.log(userExit);
      if (userExit) {
        return res.status(422).json({ error: "already Added To Cart" });
      }
      const data = new Cartitem({
        email:email,
        item: { ...item },
      });
      const savedata = await data.save();
      console.log(savedata);
      if (savedata) {
        res.status(201).json({ message: "successfully Added to Cart" });
      } else {
        res.status(500).json({ error: "Unknown Error Occured" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static GetCartData = async (req, res) => {
    const email = req.params.email;
    try {
      const Cartdata = await Cartitem.find({email:String(email).substring(1)});
      return res
        .status(201)
        .json({ data: Cartdata, message: "data collected successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  static deletecartdata = async (req,res) => {
    try {
      // console.log(req.body)
      let result =  await Cartitem.deleteOne({item:req.body});
      // console.log(result)
      return res
        .status(201)
        .json({ data: result, message: "data deleted successfully" });
    } catch (error) {
      console.log(error)
    }
  };

  static orderProduct = async(req,res) =>{
    //console.log('order product')
    const {email,item,counter} = req.body;

    try {
      const data = new orderitem({
        email:email,
        item: { ...item },
        counter:counter
      });
      const savedata = await data.save();
      // console.log(savedata);
      if (savedata) {
        res.status(201).json({ message: "successfully Ordered Your Product" });
      } else {
        res.status(500).json({ error: "Unknown Error Occured" });
      }
    } catch (error) {
      console.log(error);
    }
  } 

  static GetOrderData = async (req, res) => {
    const email = req.params.email;
    try {
      const orderdata = await orderitem.find({email:String(email).substring(1)});
      return res
        .status(201)
        .json({ data: orderdata, message: "data collected successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  static deleteorderdata = async (req,res) => {
    try {
      // console.log(req.body)
      let result =  await orderitem.deleteOne({item:req.body});
      // console.log(result)
      return res
        .status(201)
        .json({ data: result, message: "data deleted successfully" });
    } catch (error) {
      console.log(error)
    }
  };

  static Home = (req, res) => {
    res.send("this is user");
  };
}

module.exports = { userController };
