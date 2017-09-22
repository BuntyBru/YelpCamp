var mongoDatabase = require("mongoose");
var commentSchema = mongoDatabase.Schema({
    
    text:String,
    author:{
        id :{
            type: mongoDatabase.Schema.Types.ObjectId,
            ref:"User"
        }, 
        username: String
    }
});

module.exports= mongoDatabase.model("Comment",commentSchema);