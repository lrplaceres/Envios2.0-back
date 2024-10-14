import { Schema, model } from "mongoose";

const packageSchema = new Schema(
  {
    shipment: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Shipment",
      },
    type: {
      type: String,
      require: true,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
    },
    weight: {
      type: Number,
      trim: true,
    },
    value_equipment: {
        type: Number,
        trim: true,
      },
  },
  { versionKey: false, timestamps: true }
);

export default model("Package", packageSchema);