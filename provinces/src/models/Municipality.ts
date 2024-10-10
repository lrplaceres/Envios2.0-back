import { Schema, model } from "mongoose";

const municipaltySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    latitude: {
      type: String,
      trim: true,
    },
    longitude: {
      type: String,
      trim: true,
    },
    province: {
      type: Schema.Types.ObjectId,
      ref: "Province",
    },
  },
  { versionKey: false, timestamps: true }
);

export default model("Municipality", municipaltySchema);
