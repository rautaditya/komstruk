const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req,res)=>{

    const {email,password} = req.body;

    const admin = await Admin.findOne({email});

    if(!admin){
        return res.status(400).json({message:"Admin not found"});
    }

    const validPassword = await bcrypt.compare(password,admin.password);

    if(!validPassword){
        return res.status(400).json({message:"Wrong Password"});
    }

    const token = jwt.sign({id:admin._id},"secretkey",{expiresIn:"1d"});

    res.json({
        message:"Login Successful",
        token:token
    })

}