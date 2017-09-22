//we are going to add in our basic Mongoose code
var mongoose = require("mongoose");
// The below statement is done in order to upload passport-local- mongoose which is responsible for salting/hashing the password
var passportLocalMongoose = require("passport-local-mongoose");
// defining the user Schema and it consists of a username and a password
var UserSchema = new mongoose.Schema({
    username:String,
    password:String
});


// As we have loaded the passportLocalMongoose now we need to initiate it to our userSchema So it is done
// by doing the below statement

UserSchema.plugin(passportLocalMongoose);

// The bekow command is used to  export the model to app.js The "User" will be used as colection in the database.
module.exports = mongoose.model("User", UserSchema);

