import { model, Schema } from "mongoose";

const categorySchema: any = new Schema(
  {
    income: {
      type: Array,
      default: [],
    },
    expense: {
      type: Array,
      default: [],
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", categorySchema);
//category?type=income&category_name=Salary