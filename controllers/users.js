const User = require("../models/User");
const Car = require("../models/Car");

module.exports = {
  index: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
  },

  newUser: async (req, res, next) => {
    const newUser = new User(req.body);
    const user = await newUser.save();
    console.log(user);
    res.status(201).json(user);
  },

  getUser: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  },

  replaceUser: async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;

    const user = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({
      success: true,
    });
  },

  updateUser: async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;

    const user = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({
      success: true,
    });
  },
  deleteUser: async (req, res, next) => {
    const { userId } = req.params;

    const response = await User.findByIdAndDelete(userId);
    if (response) {
      res.status(200).json({
        message: "Successfully deleted",
        success: true,
      });
    }
    throw new Error("User already deleted");
  },

  getUserCars: async (req, res, next) => {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("cars");
    res.status(200).json(user.cars);
  },

  newUserCar: async (req, res, next) => {
    const { userId } = req.params;
    const newCar = new Car(req.body);

    // Get user
    const user = await User.findById(userId);
    // Assign user as a car's sells
    newCar.seller = user;
    await newCar.save();
    // Add car to the user's cars array
    user.cars.push(newCar);
    await user.save();
    res.status(201).json(user);
  },
};
