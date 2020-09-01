const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema ({
    account: {
    userID: String,

    coins: {type: Number, default: 0},
    xp: {type: Number, default: 0},
    level: {type: Number, default: 1},
    xpRemaining: {type: Number, default: 100},
    hp: {type: Number, default: 20},
    }
})

module.exports = mongoose.model("User", UserSchema);