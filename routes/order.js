// order.js file
const Order = require('../models/Order');
const { verifyToken, verifyTokenAdmin, verifyTokenAuthorization } = require('./verifyToken');
const router = require('express').Router();

// CREATE ORDER Method
router.post('/', verifyTokenAdmin, async (req, res)=> {

        const newOrder = new Order(req.body);

    try {
        // // Validate input data
        // if (!req.body || Object.keys(req.body).length === 0) {
        //     return res.status(400).json({ message: "Order data is required" });
        // }

        const savedOrder =  await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});


// UPDATE ORDER Method
router.put('/:id', verifyTokenAdmin, async (req, res)=> {
    try {
         const updatedOrder = await Order.findByIdAndUpdate(
             req.params.id,
             { $set: req.body },
             {new: true});
             res.status(200).json(updatedOrder);
    } catch (error) {    
             res.status(500).json(error);
    }
 });
 
 // DELETE ORDER Method
 router.delete("/:id", verifyTokenAdmin, async (req, res)=> {
     try {
         await Order.findByIdAndDelete(req.params.id);
         res.status(200).json("Product deletd Successfully");
     } catch (error) {
         res.status(500).json(err);
     }
 });
 
 // GET USER ORDER Method
 router.get("/find/:userId", verifyTokenAuthorization, async (req, res)=> {
     try {
         const order = await Order.findOne({ userId: req.params.userId });
         // res.status(200).json("User Got it Successfully !" + user);
         res.status(200).json(order);
     } catch (error) {
         res.status(500).json(error);
     }
 });
 
 // GET ALL USER ORDERS
 router.get('/', verifyTokenAdmin, async (req, res)=> {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
 });

 // GET MONTHLY INCOME
 router.get('/income', verifyTokenAdmin, async (req, res)=> {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth }}},
            { $project: { month: { $month: '$createdAt' }, sales: '$amount' }},
            { $group: { _id: '$month', total: { $sum: '$sales' }}}
        ]);

        res.status(200).json(income);
    } catch (error) {
        res.status(500).json(error)
    }
 });
module.exports = router;