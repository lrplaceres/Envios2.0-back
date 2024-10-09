import { Schema, model } from "mongoose";

const officeSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    phone2: {
      type: String,
      require: true,
      trim: true,
    },
    phone3: {
      type: String,
      require: true,
      trim: true,
    },
    address: {
      type: String,
      require: true,
      trim: true,
    },
    latitud: {
      type: String,
      trim: true,
    },
    longitud: {
        type: String,
        trim: true,
      },
  },
  { versionKey: false, timestamps: true }
);

export default model("Office", officeSchema);
