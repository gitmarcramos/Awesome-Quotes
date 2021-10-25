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

  quotes: [{
    user: {
      type: String,
      trim: true
    },

    text: {
      type: String,
      trim: true
    }
  }]
});

const quoteModel = model("quotes", quoteSchema);

module.exports = quoteModel;