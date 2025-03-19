const User = require('../models/User');
const { verifyTokenAuthorization, verifyTokenAdmin } = require('./verifyToken');
const router = require('express').Router();

// ...................just for testing purpose...................
// router.get('/usertest', (req, res)=> {
//     res.send('user test is successfully');
// } 
// );
// router.post('/userposttest', (req, res)=> {
//     // const username = req.body.username;
//     const username = req.body.username;
//     // console.log(username);
//     res.send('Your username is: ' + username);
// });

// UPDATE Method
router.put('/:id', verifyTokenAuthorization, async (req, res)=> {
   if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
        ).toString();
   }
   try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            {new: true});
            res.status(200).json(updatedUser);
   } catch (error) {    
            res.status(500).json(error);
   }
});

// DELETE Method
router.delete("/:id", verifyTokenAuthorization, async (req, res)=> {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deletd Successfully");
    } catch (error) {
        res.status(500).json(err);
    }
});

// GET/FIND Method
router.get("/find/:id", verifyTokenAdmin, async(req, res)=> {
    try {
        const user = await User.findById(req.params.id);
        // res.status(200).json("User Got it Successfully !" + user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL USERS
router.get("/", verifyTokenAdmin, async (req, res)=> {
    const query = req.query.new;
    try {
        const users = query ? await User.find().limit(1).sort({ _id: -1 }) : await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET USER STATS
router.get("/stats", verifyTokenAdmin, async(req, res)=> {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear }}},
            { $project: { month: { $month: "$createdAt" }}},
            { $group: { _id: "$month", total: { $sum: 1 }}},
        ]);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;