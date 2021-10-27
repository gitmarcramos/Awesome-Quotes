const {model, Schema} = require("mongoose");

const quoteSchema = new Schema({
  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  
  quoteDate: Date,

  dateCreatedAt: {
    type: Date,
    required: true
  },

  quotes: {
    type : [{
    user: {
      type: String,
      trim: true,
      required: true
    },

    text: {
      type: String,
      trim: true,
      required: true
    }
  }],
  validate: v => v.length > 0
},

  hashtags: {
    type: [String]
  },

  likes: {
    type: Number,
    default: "like"
  },

  favorites: {
    type: Number,
    default: "save"
  },

});

const quoteModel = model("quotes", quoteSchema);

module.exports = quoteModel;