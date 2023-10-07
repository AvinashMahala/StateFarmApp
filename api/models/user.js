const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    email:{
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 6,
    },
    verified:{
        type: Boolean,
        default: false,
    },
    verificationToken:{
        type: String,
    },
    addresses:[
    {
        name:String,
        mobileNo:String,
        houseNo:String,
        street:String,
        landmark:String,
        city:String,
        country:String,
        postalCode:String
    }
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;


