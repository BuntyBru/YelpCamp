var exp = require("express");
var app = exp();
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
app.set("view engine","ejs");
var parser=require("body-parser");
// requiring the seeds file
var seedDB = require("./seeds");
var Campground = require("./models/campground");

var Comment = require("./models/comment");
var User = require("./models/user");
var methodOverride = require("method-override");// in order to require the method override part000
app.use(exp.static(__dirname+"/public"));
app.use(methodOverride("_method"));

//seedDB();//SEED THE DATABASE
//
var mongoDatabase = require("mongoose");

//mongoDatabase.connect("mongodb://localhost/yelp_campv12");
mongoDatabase.connect("mongodb://Bunty:yelpcamp2017@ds139675.mlab.com:39675/yelpcamp");


var commentRoutes= require("./routes/comments"); 
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes= require("./routes/index");


app.use(parser.urlencoded({extended: true}));
app.use(flash());
//CONFIGURING UP OF THE PASSPORT
//The express session is used below, The secret entered will be used to encode or decode the authentication access
//As we know that the data entered here is Human readable but at the same time we need to understand that
// the "secret" is supposed to be used for encoding or decoding the data.
app.use(require("express-session")({
    secret:"Once again Rusty wins cutest dog!",
    resave:false,
    saveUninitialized: false
}));
// below two lines are always used whenever we want to use passport
app.use(passport.initialize());// this line is used for initializing the passport
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));//User.authenticate comes from the passport-local-mongoose
// The below command is used for reading the session , 
passport.serializeUser(User.serializeUser());// and putting it back in the session which is what this does
passport.deserializeUser(User.deserializeUser());//taking the data from the session that is encoded and decoding it and serializing it
// and rather than addding our own methods we add this into the user.js by using passportLocalMongoose
//Basically what is done in the above two statements is that in serializeUser part the userID is extractrd as we know in order to
//assosciate the data of the corresponding user,in case of mongoDB userId is needed. This userID is passed to deserializer and then the
//corresponding profile is found 

//

app.use(function(req,res,next){
    res.locals.currentuser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



// Now its just not the matter of importing the file.We also use to put up the app.use part. It is important because
// The server will run allright and we will not be able to know about the problem.
// the thing between inverted commas is written on order to shorten the routes
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/",indexRoutes);






// this part  is used to make the server listen to our program
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Our server has started");
});