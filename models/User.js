const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    cars: [
      {
        type: Schema.Types.ObjectId,
        ref: "car",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("user", userSchema);
module.exports = User;
