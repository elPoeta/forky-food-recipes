const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['BREAKFAST', 'LUNCH', 'DINNER', 'DESSERTS', 'SNAKS', 'DRINKS', 'VEGETARIAN', 'INTERNATIONAL', 'OTHER'],
    default: 'OTHER'
  },
  ingredients: [
    {
      type: String,
      required: true
    }
  ],
  prepTime: {
    hours: {
      type: Number,
      default: 0
    },
    minutes: {
      type: Number,
      default: 0
    }
  },
  cookTime: {
    hours: {
      type: Number,
      default: 0
    },
    minutes: {
      type: Number,
      default: 0
    }
  },
  servings: {
    type: Number
  },
  difficultType: {
    type: String,
    enum: ['EASY', 'MODERATE', 'KIND_OF_HARD', 'HARD'],
    default: 'EASY'
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/600X600.png?text=Image+Not+Found'
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      body: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const Recipe = new mongoose.model('recipe', RecipeSchema);

module.exports = Recipe;