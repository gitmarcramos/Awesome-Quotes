const {model, Schema} = require("mongoose");

const emailSchema = new Schema ({
    type: String,
    required: [true, 'Email is required.'],
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    unique: true,
    lowercase: true,
    trim: true
});


const emailModel = model("email", emailSchema);

module.exports = emailModel;