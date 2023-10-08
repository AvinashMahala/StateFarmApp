const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const policies = require('./models/policies');
const fs = require('fs') 
const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

const apiUrl = "http://10.182.235.82:8000/";

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.zvwn3yq.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected To MongooseDB!");
  })
  .catch((err) => {
    console.log("Error Connecting To MongoDB! ", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000!");
});

const User = require("./models/user");
const Order = require("./models/order");

//function to send Verification Email to the user
const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transport

  const transporter = nodemailer.createTransport({
    //configure the email service
    service: "gmail",
    auth: {
      user: "avinash.mahala.am@gmail.com",
      pass: "ptfmtzengtvtzvfu",
    },
  });

  //compose the email message.
  const mailOptions = {
    from: "statefarm.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email : http://10.182.235.82:8000/verify/${verificationToken}`,
  };
  //Send Email.
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error Sending Verification Email.", error);
  }
};

//endpoint to register in the app.
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Check if the email is already registered.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    //Create a New User
    const newUser = new User({ name, email, password });

    //Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(64).toString("hex");

    //Save the user to the database.
    await newUser.save();

    //Send the verification email.
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    console.log("user created");
    res.status(200).json({ message: "Registration Successful." });
  } catch (error) {
    console.log("Error Registering User: ", error);
    res.status(500).json({ message: "Registration Failed." });
  }
});

//Endpoint to verify the email.
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user with the given verification token.
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid Verification Token." });
    }

    //Mark.User as Verified.
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email Verified Successfully." });
  } catch (error) {
    res.status(500).json({ message: "Email Verification Failed." });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};
const secretKey = generateSecretKey();

//Endpoint to login the user.
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user exists.
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //check if the password is correct.
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //generate a jwt token.
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({token});
  } catch (error) {
    res.status(500).json({ message: "Login Failed." });
  }
});


// input : client filter from questionere 
app.post("/policy/getPolicyCount" , async (req,response)=>{
  try{
  const {
    assetType,
    model,
    mileage,
    age,
    lastService,

  } = req.body;
  
  const count = await policies.find({
      assetType: assetType,
      model: model,
      mileage : {
        $gt : mileage
      },
      age: {
        $gt : age
      },
      lastService: {
        $gt : lastService
      }
  }).count();

  return response.status(200).send({count});

}
catch(err){
  console.log("Error while fetching count of policies", err.message);
}


})

app.post("/policy/getAllPolicies" , async (req,response)=>{
  try{
  const {
    assetType,
    model,
    mileage,
    age,
    lastService,
  } = req.body;
  
  const count = await policies.find({
      assetType: assetType,
      model: model,
      mileage : {
        $gt : mileage
      },
      age: {
        $gt : age
      },
      lastService: {
        $gt : lastService
      }
  }).then(res=>{
     response.status(200).send(res)
  }).catch(err=>{
    console.log("Error while fetching policies")
  })

  

}
catch(err){
  console.log("Error while fetching count of policies", err.message);
}


})

const ModelSamples = ["Heavy", "Transport", "Compact", "Standard"];

app.post("/policy/getNPolicies" , async (req,response)=>{
  try{
    if(!req.body){
      response.status(404).send("Provide Detials");
    }
    else{
  var {
    assetType,
    model,
    mileage,
    age,
    lastService,
  } = req.body;
  assetType=[ assetType ];
  model = [ model ];
  if(!assetType[0]) assetType = ["Car", "Motorcycle", "Truck"];
  if(!model[0]) model = ModelSamples;
  if(!mileage)mileage = 0;
  if(!age) age = 0;
  if(!lastService) lastService = 0;

  console.log("assetType ", assetType, " model ", model , "mileage ",
  mileage, " age ", age, " lastService ", lastService
  )
  const count = await policies.find(
    {
      assetType: { $in :assetType},
      model: { $in :model},
      mileage : {
        $gt : mileage
      },
      age: {
        $gt : age
      },
      lastService: {
        $gt : lastService
      }
    }
  ).count();
     response.status(200).send({count});
    }
}
catch(err){
  console.log("Error while fetching count of policies", err.message);
}


})


  


        

//   function generateRandomPolicy() {
//   const policies = [];
//   const policyNames = ["Policy A", "Policy B", "Policy C", "Policy D", "Policy E"];
//   const assetTypes = ["Car", "Motorcycle", "Truck"];
//   const coverageOptions = ["Basic", "Extended"];
//   const models = ["Heavy", "Transport", "Compact", "Standard"];

//   for (let i = 1; i <= 1000; i++) {
//     const policy = {
//       policyID:new mongoose.Types.ObjectId,
//       policyName: policyNames[Math.floor(Math.random() * policyNames.length)],
//       policyCost: Math.floor(Math.random() * 1000) + 500, // Random cost between 500 and 1499
//       policyDescription: "Sample policy description",
//       policyQualifiers: [],
//       assetType: assetTypes[Math.floor(Math.random() * assetTypes.length)],
//       policyCoverage: Math.floor(Math.random() * 11) + 1, // Random coverage between 1 and 11 months
//       maintenance: new mongoose.Types.ObjectId, // 50% chance of true/false
//       age: Math.floor(Math.random() * 19) + 1, // Random age between 1 and 19
//       model: models[Math.floor(Math.random() * models.length)],
//       lastService: Math.floor(Math.random() * 12) + 1, // Random last service between 1 and 12 months
//       mileage: Math.floor(Math.random() * 100000), // Random mileage
//       maintainanceInterval: Math.floor(Math.random() * 11) +1, // Random maintainance interval between 1 and 12 months
//     };
  
//     policies.push(policy);   
//   }

//   return policies; 
// }

// const policiesArray =  generateRandomPolicy();
// console.log(policiesArray, null, 2);
// // fs.writeFile('Output.js', policiesArray, (err) => { 
          
// //   // In case of a error throw err.  
// //   if (err) throw err; 
// // }) 

// if(policiesArray.length>900){
//   policiesArray.forEach(async policy => {
//    const newPolicy  = new policies({
//     ...policy,
//    })

//    newPolicy.save().then(res=>{
//    console.log("saved policy", res);
//    }).catch(err=>{
//   // console.log("error saving policy", err.message); 
//    })

//   }) 
// }


