import { Schema, model } from "mongoose";

const shipmentSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Client",
    },
    receipent: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Receipent",
    },
    office: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Office",
    },
    packages_total: {
      type: Number,
      require: true,
    },
    facture_number: {
      type: Number,
      require: true,
      unique: true,
    },
    status: {
      type: String,
      require: true,
      trim: true,
    },
    code: {
      type: String,
      require: true,
      trim: true,
    },
    province: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Province",
    },
    municipality: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Municipality",
    },
    value_total: {
      type: Number,
      require: true,
    },
    value_customs: {
      type: Number,
      require: true,
    },
    value_shipment: {
      type: Number,
      require: true,
    },
    weight: {
      type: Number,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status_delivery: {
      type: String,
      trim: true,
      require: true,
    },
    date_acepted_delivery: {
      type: Date,
    },
    date_delivery: {
      type: Date,
    },
    description_delivery: {
      type: String,
      trim: true,
    },
    photo_delivery: {
      type: String,
      trim: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export default model("Shipment", shipmentSchema);
