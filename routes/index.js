var express = require("express");

var router = express.Router();
//Things are added as required The file did not have passport or the user We had to integrate that
var passport = require("passport");
var User = require("../models/user");


router.get("/",function(req,res)
{
    
    res.render("home.ejs");

});



//Campground.create({name:"Salmon Creek", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",description:"This is the place you really need to go"},
//function(err,lawda)
//{
  // if(err)
   //{
     //  console.log("There was an ERROR");
//  }
  // else{
    //   console.log("Added to the database");
       
   //}});





//As we are puttind comments , There is a bneed of various ROUTES


//=================================================================================================================================\
//From here we start adding authorization routes

router.get("/register",function(req,res){
    res.render("register");
});

//handle sign up logic
router.post("/register",function(req,res)
{
    //just in orde to make the code clean we are creating a vartiable here for new user
    var newUser = new User({username:req.body.username});
    //pasing the password also through the below line
    User.register(newUser,req.body.password,function(err,user)
    {
        if(err)
        {
            req.flash("error",err.message);
            console.log(err);
            return res.render("register");
            
        }
        //below command is used to authenticate the password entered by the user, if the user has entere the correct password he will be redirected to the campground
        passport.authenticate("local")(req,res,function(){
            
                    req.flash("success","Welcome to YelpCamp," + user.username);
            res.redirect("/campgrounds");
        });
    });
});



//Show login form

router.get("/login",function(req,res)
{
    
    res.render("login");
});


//post for login
// the below dformat is  app.post("/login",middkleware,callback)
//when a request comes in to "/login" authentication will run first
// It will take the both username and password and authenticate it
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res)
{

});

// Logout Route

router.get("/logout",function(req,res)
{
    req.logout();
    req.flash("success","Logged you out");
   res.redirect("/campgrounds"); 
    
});


// adding isLoggedIn function here as we want our system to be in such a way that an unlogged user is not able to put on comments
// We can add it anywhere where we wish to have this authentication.
//function isLoggedIn(req,res,next)
//{
//    if(req.isAuthenticated()){
//        return next();
//    }
//    res.redirect("/login");
//}
// THe above code has been moved to middleware


module.exports = router;