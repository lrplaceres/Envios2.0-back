import { Schema, model } from "mongoose";

const provincesSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    acronym: {
      type: String,
      require: true,
      trim: true,
    },
    latitude: {
      type: String,
      require: true,
      trim: true,
    },
    longitude: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export default model("Province", provincesSchema);
