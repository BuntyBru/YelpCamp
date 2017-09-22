var mongoDatabase = require("mongoose");
// the term author is added here lately in order to associate the campgrounds with their authors
var campgroundSchema = new mongoDatabase.Schema({
    
    name: String,
    price:String,
    image:String,
    description: String,
    author : {
        id:{
            type: mongoDatabase.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    comment1s:[{
                 type: mongoDatabase.Schema.Types.ObjectId,
                 ref:"Comment"
    }
        ]
});


module.exports = mongoDatabase.model("Campground",campgroundSchema);