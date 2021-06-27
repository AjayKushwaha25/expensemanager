const { reset } = require("nodemon");
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const { use } = require("../routes/userRouter");
require("dotenv").config();

const userCtrl = {
  register: async (req:any, res:any) => {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "The  email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password should be atleast 6 characters long" });

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });
      await newUser.save();
    
      res.json({msg: "Registered successfully"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req:any, res:any) => {
    try {
      const {email,password} = req.body;

      const user = await Users.findOne({email})
      if(!user)
        return res.status(400).json({msg:"User does not exist.."})
            
      const isMatch =await bcrypt.compare(password, user.password)
      if(!isMatch) return res.status(400).json({msg: "incorrect password"})      
       
      res.json({msg: "Login succesfull", errVal:false})

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }

  },
  logout: async (req:any, res:any) =>{
    try {
      res.clearCookie('refreshtoken', {path: '/user/refresh_token'} )
      return res.json({msg: "Logged out"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }

  }

}

module.exports = userCtrl;
