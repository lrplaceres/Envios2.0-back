import { Schema, model } from "mongoose";

const receipentSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    cellphone: {
      type: String,
      require: true,
      trim: true,
    },
    address: {
      type: String,
      require: true,
      trim: true,
    },
    numberId: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      length: 11
    },
  },
  { versionKey: false, timestamps: true }
);

export default model("Receipent", receipentSchema);
