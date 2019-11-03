const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/user');
const Recipe = require('../models/recipe');

module.exports = {
  createRecipe: asyncHandler(async (req, res) => {
    const { user } = req.user;
    const { title, category, prepTime, cookTime, servings, difficultType } = req.body;

    const foundUser = await User.findOne({ email: user.email });
    if (!foundUser) {
      return res.status(400).json({ error: "User not found" });
    }

    //title - string
    // category enum: ['BREAKFAST', 'LUNCH', 'DINNER', 'DESSERTS', 'SNAKS', 'DRINKS', 'VEGETARIAN', 'INTERNATIONAL', 'OTHER'],
    //ingredients: []
    // prepTime: { hours: {Number}, minutes: {Number} },
    // cookTime: { hours: {Number}, minutes: {Number} },
    // servings:  type: Number
    //difficultType: type: enum: ['EASY', 'MODERATE', 'KIND_OF_HARD', 'HARD'],

    const newRecipe = new Recipe({
      user: foundUser._id, title, category, prepTime, cookTime, servings, difficultType
    });
    const recipe = await newRecipe.save();
    res.status(200).json({ create: "Recipe Created...", recipe });
  })
}