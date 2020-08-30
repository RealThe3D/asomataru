const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema ({
    userID: String,

    coins: {type: Number, default: 0}
})
module.exports = mongoose.model("User", UserSchema);