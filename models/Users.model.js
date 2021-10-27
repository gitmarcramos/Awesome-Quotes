const {model, Schema} = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },

  pseudo: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },

  mail: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  profilePic: {
    type: String,
    default: '',
  },

  description: {
    type: String,
    default: '',
  },

  creationDate: {
    type: Date,
    required: true
  },

  role: {
    type: String, 
    enum: ["user", "admin"],
    default: "user"
  },
  
  followers: {
    type: [Schema.Types.ObjectId],
    ref: "users"
  },

  following: {
    type: [Schema.Types.ObjectId],
    ref: "users"
  },
  
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: "quotes",
  },
  
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "quotes",
  },
  
});

const userModel = model("users", userSchema);

module.exports = userModel;