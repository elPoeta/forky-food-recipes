const moogoose = require("mongoose");
const Schema = moogoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  location: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  social: {
    instagram: {
      type: String
    },
    twitter: {
      type: String
    },
    youtube: {
      type: String
    },
    facebook: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = moogoose.model("profile", profileSchema);
