const { Schema, model } = require("mongoose");

const carSchema = new Schema(
  {
    make: String,
    model: String,
    year: Number,
    seller: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Car = model("car", carSchema);
module.exports = Car;
