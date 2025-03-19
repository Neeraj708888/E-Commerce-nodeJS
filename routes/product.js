const Product = require('../models/Product');
const { verifyTokenAdmin } = require('./verifyToken');
const router = require('express').Router();

// CREATE Product
router.post('/', verifyTokenAdmin, async (req, res)=> {
    const newProduct = new Product(req.body);

    try {
        const savedProduct =  await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});


// UPDATE Product Method
router.put('/:id', verifyTokenAdmin, async (req, res)=> {
    try {
         const updatedProduct = await Product.findByIdAndUpdate(
             req.params.id,
             { $set: req.body },
             {new: true});
             res.status(200).json(updatedProduct);
    } catch (error) {    
             res.status(500).json(error);
    }
 });
 
 // DELETE  Product Method
 router.delete("/:id", verifyTokenAdmin, async (req, res)=> {
     try {
         await Product.findByIdAndDelete(req.params.id);
         res.status(200).json("Product deletd Successfully");
     } catch (error) {
         res.status(500).json(err);
     }
 });
 
 // GET Product Method
 router.get("/find/:id", async(req, res)=> {
     try {
         const product = await Product.findById(req.params.id);
         // res.status(200).json("User Got it Successfully !" + user);
         res.status(200).json(product);
     } catch (error) {
         res.status(500).json(error);
     }
 });
 
 // GET ALL PRODUCT
 router.get("/", async (req, res)=> {
     const queryNew = req.query.new;
     const queryCategory = req.query.category;
     try {

        let products; // CREATE EMPTY ARRAY

        if(queryNew){
            products = await Product.find().sort({ createdAt: -1 }).limit(2);
        }else if(queryCategory){
            products = await  Product.find({ categories: { $in: [ queryCategory ],}})
        }else{
            products = await Product.find();
        }

         res.status(200).json(products);
     } catch (error) {
         res.status(500).json(error);
     }
 });

module.exports = router;