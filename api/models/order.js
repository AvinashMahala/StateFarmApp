const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  products: [
    {
      name: {
        type: String,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      image: {
        type: String,
        require: true,
      },
    },
  ],
  totalPrice:{
    type:Number,
    required: true
  },
  shippingAddress:{
    name:{
        type:String,
        required:true,
    },
    mobileNo:{
        type:String,
        required:true,
    },
    houseNo:{
        type:String,
        required:true,
    },
    street:{
        type:String,
        required:true,
    },
    landmark:{
        type:String,
        required:true,
    },
    postalCode:{
        type:String,
        required:true,
    }
  },
  paymentMethod:{
    type: String,
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports=Order;
