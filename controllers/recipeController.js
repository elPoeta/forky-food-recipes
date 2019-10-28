const asyncHandler = require('../middlewares/asyncHandler');

module.exports = {
  createRecipe: asyncHandler(async (req, res) => {
    res.status(200).json({ create: "Recipe Created..." });
  })
}