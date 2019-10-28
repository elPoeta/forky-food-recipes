const express = require('express');
const router = express.Router();
const { createRecipe } = require('../../../controllers/recipeController');
const { auth } = require('../../../middlewares/authorization');

router.post('/create', [auth], createRecipe);

module.exports = router;