import { Request, Response } from "express";

const { Promise: any } = require("mongoose");
const Category = require("../models/categoryModel");

const FeaturesAPI = {

}


const categoryCtrl = {
  getCategories: async (req: Request, res:Response) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req : Request, res: Response) => {
    try {
        const {type, name, email} = req.body;
        const category = await Category.findOne({name})
        if(category) return res.status(400).json({msg: "This category alreaady exist"})

        const newCategory = new Category({type, name, email})
        await newCategory.save()
        res.json({msg: "Created a Category"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory : async (req: Request, res: Response) =>{
      try {
          await Category.findByIdAndDelete(req.params.id )
          res.json({msg: "Deleted a Category"})
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
  },
  updateCategory : async (req :Request, res: Response) =>{
    try {

        const {name} = req.body;
        await Category.findByIdAndUpdate({_id: req.params.id},{name})

        res.json({msg: "Updated Succefully"})
   
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
}
};

module.exports = categoryCtrl;
