import { Schema, model } from "mongoose";

const clientSchema = new Schema(
    {
      name: {
        type: String,
        require: true,
        trim: true,
      },
      phone: {
        type: String,
        require: true,
        trim: true,
        unique: true,
      },
      address: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
      },
      license: {
        type: String,
        trim: true,
        unique: true,
      },
      passport: {
        type: String,
        trim: true,
        unique: true,
      },
      noUSCIS: {
        type: String,
        trim: true,
        unique: true,
      },
    },
    { versionKey: false, timestamps: true }
  );
  
  export default model("Client", clientSchema);