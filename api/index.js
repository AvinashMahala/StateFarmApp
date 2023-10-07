const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

const apiUrl = 'http://11.40.130.20:8000/';

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.zvwn3yq.mongodb.net/", {
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
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email : http://11.40.130.20:8000/verify/${verificationToken}`,
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
    console.log('user created');
    res.status(200).json({ message: "Registration Successful." });

  } catch (error) {
    console.log("Error Registering User: ", error);
    res.status(500).json({ message: "Registration Failed." });
  }
});



//Endpoint to verify the email.
app.get("/verify/:token", async(req, res)=>{
    try {
        const token = req.params.token;
        
        //Find the user with the given verification token.
        const user = await User.findOne({verificationToken:token});
        if(!user){
            return res.status(404).json({message:"Invalid Verification Token."})
        }

        //Mark.User as Verified.
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({message:"Email Verified Successfully."});

    } catch (error) {
        res.status(500).json({message: "Email Verification Failed."});
    }
})
