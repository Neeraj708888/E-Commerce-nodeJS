// 2nd way

// index.js file
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const ordersRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const cors = require('cors');
app.use(cors());

// CONNECT DATABASE
mongoose.connect(process.env.Mongo_URL).then(()=> console.log('✅ DB Connected Successfully!')
).catch((err)=> console.log(err)
);

app.use("/api/auth", authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/carts', cartRoute);
app.use('/api/checkout', stripeRoute);

app.listen(process.env.PORT || 5000, ()=> {
    console.log('🚀 Backend Server is running on port 5000...');
});

// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// app.use(express.json());  // Enable JSON parsing

// const mongoURI = "mongodb+srv://amcksharma:neeraj123@cluster0.oevas.mongodb.net/shop?retryWrites=true&w=majority";
// const mongoURI = "mongodb://atlas-sql-67cdb91f5114671846687839-oevas.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin"

// mongoose.connect(mongoURI)
//     .then(() => console.log('✅ DB Connected Successfully!'))
//     .catch((err) => console.error('❌ MongoDB Authentication Error:', err));

// app.listen(5000, () => {
//     console.log('🚀 Backend Server is running on port 5000...');
// });

// const dbConnect = require('./mongodb');
// dbConnect().then((res)=>  console.log(res, 'Connect Successfully'));

// **********   Create APIs here  *************** //
// GET API
// app.get('/api/test', (req,res)=> {
//     console.log('Test API is working');
// });

// POST API
// app.post('/api/post', (req, res)=> {
//     console.log('POST APi is working..');  
// });

// Delete Api
// app.delete('/api/delete', (req, res)=> {
//     console.log('Delete API is working ..');   
// });

// PUT Api
// app.put('/api/update', (req, res)=> {
//     console.log('Update API is woking..'); 
// });
