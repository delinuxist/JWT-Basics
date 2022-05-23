const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username required"],
  },
  // email: {
  //   type: String,
  //   required: [true, "Email required"],
  // },
  password: {
    type: String,
    required: [true, "Password required"],
  },
});

module.exports = mongoose.model("User", UserSchema);
