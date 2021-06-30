import {model, Schema} from 'mongoose'

const categorySchema: any = new Schema(
  {
    type:{
      type: String,
  },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email:{
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", categorySchema)