const mongoose = require('mongoose');

const policiesSchemaX = new mongoose.Schema({

    policyID:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true,
    },
    policyName:{
        type: String,
        required:true,
    },
    policyCost:{
        type:Number,
        required:true,
    },
    policyDescription:{
        type: String,
        required:false,
    },
    policyQualifiers :[],
    assetType:{
        type: String,
        required:true,
    },
    policyCoverage:{
        type: String,

    },
    maintenance:{
        type: mongoose.Schema.Types.ObjectId,

    },
    maintainanceInterval:{
        type:Number,
    },
    age:{
        type: Number,
    },
    model:{
        type:String,
    },
    lastService:{
        type : Number,
    },
    mileage:{
        type: Number,
    }
})

const policies = mongoose.model("policies", policiesSchemaX);

module.exports =  policies;