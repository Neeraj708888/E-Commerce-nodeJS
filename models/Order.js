// Order.js Model

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: { type: String },
                quantity: { type: Number,  default: 1, },
            }
        ],
        amount: { type: Number, require: true },
        address: { type: Object, required: true },
        status: { type: String, default: "pending.."}
    },
    { timestamps: true }
);
module.exports = mongoose.model('Order', OrderSchema);
// module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);