import { Request, Response } from "express";

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
      const {email,password,name,_id} = req.body;
      const user = await Users.findOne({email})
      if(!user)
        return res.status(400).json({msg:"User does not exist..", errVal:true})
            
      const isMatch =await bcrypt.compare(password, user.password)
      if(!isMatch) return res.status(400).json({msg: "incorrect password", errVal:true})      
      const data = ({pas:req.body.password,name:user.name,role:user.role,id:user._id});

      res.json({msg: "Login succesfull", errVal:false,data:data});
      console.log(res.body)
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

  },
  addExpense: async (req: any, res:any) =>{
   try{
    const { role, expense, income, name, email, password} = req.body;
    //  if(!images) return res.status(400).json({msg: "No image Upload"})
    const expenseGet: any[] = req.params.expense
      await Users.findOneAndUpdate({_id: req.params.id},{
         expense:req.body.expense
      })

      res.json({msg: "Updated a Expense"})
  }catch(err){
    return res.status(500).json({msg:err.message})
  }
  },
  addIncome: async (req:any, res:any) =>{
    try{
      const { role, expense, income, name, email, password} = req.body;
      //  if(!images) return res.status(400).json({msg: "No image Upload"})
     // const expenseGet: any[] = req.params.expense
        await Users.findOneAndUpdate({_id: req.params.id},{
           income:req.body.income
        })
  
        res.json({msg: "Updated a Income"})
    }catch(err){
      return res.status(500).json({msg:err.message})
    }
  },
  getUser: async (req: any, res:any ) =>{
    try {
      const user = await Users.findById(req.user.id).select('-password')
      if(!user) return res.status(400).json({msg: "User does not exist."})
      res.json(user)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  },
  userProfile: async (req: any, res: any) => {
    try {
      const user = await Users.findOne({_id: req.params.id});
      if(user=="" || user == null || !user){
        return res.status(400).json({msg: "User Not Found"});
      }else{
        res.json({msg: "Record Found", errVal: false, data: user})
      }
    } catch (err) {
      return res.status(500).json({msg: err.message, errVal: true, data: null});
    }

  },
  updateUserProfile : async (req :Request, res: Response) =>{
    try {
      const data= req.body;
      // return res.json(data)
      await Users.findByIdAndUpdate({_id: req.params.id},data)
      res.json({msg: "Record Updated Successfully", errVal: false});   
    } catch (err) {
      return res.status(500).json({msg: err.message, errVal: true, data: null});
    }
  },
}

module.exports = userCtrl;
