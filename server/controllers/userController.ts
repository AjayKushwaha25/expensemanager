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
      const data = req.body;
      //  if(!images) return res.status(400).json({msg: "No image Upload"})
     // const expenseGet: any[] = req.params.expense
        const expenseShow = await Users.findOneAndUpdate({_id: req.params.id},{
          $push: {expense:data}
        })
  
        res.json({msg: "Updated a Expense", data: expenseShow})
    }catch(err){
      return res.status(500).json({msg: err.message,errVal: true})
    }
  },
  addIncome: async (req:any, res:any) =>{
    try{
      const data = req.body;
      //  if(!images) return res.status(400).json({msg: "No image Upload"})
     // const expenseGet: any[] = req.params.expense
        const incomeShow = await Users.findOneAndUpdate({_id: req.params.id},{
          $push: {income:data}
        })
  
        res.json({msg: "Updated a Income", data: incomeShow})
    }catch(err){
      return res.status(500).json({msg: err.message,errVal: true})
    }
  },
  showIncome: async (req:any, res:any) =>{
    try {
      const userIncomeByID = await Users.findById(req.params.id).select('income')
      if(!userIncomeByID) return res.status(400).json({msg: "User does not exist."})
      res.json({msg: "Record Found",errVal: false, data: userIncomeByID})
    } catch (err) {
      return res.status(500).json({msg: err.message,errVal: true})
    }
  },
  showExpense: async (req:any, res:any) =>{
    try {
      const userExpenseByID = await Users.findById(req.params.id).select('expense')
      if(!userExpenseByID) return res.status(400).json({msg: "User does not exist."})
      res.json({msg: "Record Found",errVal: false, data: userExpenseByID})
    } catch (err) {
        return res.status(500).json({msg: err.message,errVal: true})
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
      const password= req.body.password;
      if(password){
      // return res.json(data)
        req.body.password = await bcrypt.hash(password, 10);
      }
      await Users.findByIdAndUpdate({_id: req.params.id},data)
      res.json({msg: "Record Updated Successfully", errVal: false});
    } catch (err) {
      return res.status(500).json({msg: err.message, errVal: true, data: null});
    }
  },
  addCategory: async (req:any, res:any) =>{
    try{
      const data = req.body;
      if(data.type=="Income"){
        const catName = data.name;
        const result = await Users.findOne({ _id: req.params.id });
        // const incomeCat = result.incomeCategory.toString().toLowerCase();
        // const incomeCatLC = incomeCat.toString().toLowerCase();
        if (result.incomeCategory.toString().toLowerCase().includes(catName.toLowerCase())){
          return res.status(400).json({ msg: "The Income Category already exists.", errVal: true });
        }else{
          await Users.findOneAndUpdate({_id: req.params.id},{
            $push: {incomeCategory:data.name}
          })
          const addIncomeCat = await Users.findOne({_id: req.params.id});
          res.json({msg: "Income Category Added", data: addIncomeCat, errVal: false})
        }
      }else if(data.type=="Expense"){
        const catName = data.name;
        const result = await Users.findOne({ _id: req.params.id });
        if (result.expenseCategory.toString().toLowerCase().includes(catName.toLowerCase())){
          return res.status(400).json({ msg: "The Expense Category already exists.", errVal: true });
        }else{
          await Users.findOneAndUpdate({_id: req.params.id},{
            $push: {expenseCategory:data.name}
          })
          const addExpenseCat = await Users.findOne({_id: req.params.id});
          res.json({msg: "Expense Category Added", data: addExpenseCat, errVal: false})
        }
        }else{
          return res.status(500).json({msg: "Undefined Category",errVal: true})
        }
    }catch(err){
      return res.status(500).json({msg: err.message,errVal: true})
    }
  },
  showIncomeCategory: async (req:any, res:any) =>{
    try {
      const incomeCategoryByID = await Users.findById(req.params.id).select('incomeCategory')
      if(!incomeCategoryByID) return res.status(400).json({msg: "No records found.", errVal: true})
      res.json({msg: "Record Found",errVal: false, data: incomeCategoryByID})
    } catch (err) {
        return res.status(500).json({msg: err.message,errVal: true})
    }
  },
  showExpenseCategory: async (req:any, res:any) =>{
    try {
      const expenseCategoryByID = await Users.findById(req.params.id).select('expenseCategory')
      if(!expenseCategoryByID) return res.status(400).json({msg: "No records found.", errVal: true})
      res.json({msg: "Record Found",errVal: false, data: expenseCategoryByID})
    } catch (err) {
        return res.status(500).json({msg: err.message,errVal: true})
    }
  },
}

module.exports = userCtrl;
