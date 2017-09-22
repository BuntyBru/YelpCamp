var express = require("express");

var router = express.Router();

var Campground= require("../models/campground");
var middleware=require("../middleware");// As we have defined the main file inside the directory "middleware" as index, We dont need
//to define the statement as var middleware=require("../middleware/index.js"); instead we can just write
//var middleware=require("../middleware");

router.get("/",function(req,res){
    //the below line is to know about the user and it will be used ahhead to make a process through which the navigation bar will be changed with respect to  the looged in user and unlogged in user.
  // console.log(req.user); 
    
    Campground.find({},function(err, camps){
        if(err)
        {
            console.log("ERROR");
        }
        else{
             res.render("campgrounds/campgrounds",{campgrounds:camps, currentuser : req.user});
        }
    });
   
});

//CREATE CAMPGROUNDS
router.post("/",middleware.isLoggedIn,function(req, res)
{
   //get data from form and add to campgrounds array and also want to redirect to the same page.
    var name1 = req.body.new_camp;
    var price = req.body.new_camp_price;
    var image1= req.body.new_camp_image;
    var desc = req.body.new_camp_description;
    var author = {
        id:req.user._id,
        username:req.user.username
    };
    var newCampground = {name:name1,price:price, image:image1, description:desc, author:author};
   
    //create a new campground and save to DB
    Campground.create(newCampground,function(err,newlyCreated){
        if(err)
        {
            console.log("ERROR");
        }
        else{
            
              //Now after everything is done the person should be redirected to the main page
    res.redirect("/campgrounds");
        }
    });

  
});
router.get("/new",middleware.isLoggedIn,function(req,res){
    
    res.render("campgrounds/new");
});

//SHOW ROUTE
router.get("/:id",function(req,res)
{
    //find the campground with the provided ID
Campground.findById(req.params.id).populate("comment1s").exec(function(err,Campidentity){
    if(err || !Campidentity)
    {
        req.flash("error","Campground not found");
        res.redirect("back");
    }
    else
    {
         res.render("campgrounds/show",{campgroundsInfo:Campidentity});
    }
});    
   
});


//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    //now we have to check that the user who is logged in has the authorization to edit the campgrounds.
              Campground.findById(req.params.id,function(err,foundCampground){
                if(err)
                {
                    res.redirect("/campgrounds");
                }
            else{
            //We have reached here which means that the user is logged in now we need to see that whether the 
            //user owns the campground or not. If he does not hw cannot edit.
                res.render("campgrounds/edit",{campground:foundCampground});
                }
    });      
    });



//UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
 Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground)
 {
     if(err)
     {
         res.redirect("/campgrounds");
     }
     else
     {
         res.redirect("/campgrounds/"+req.params.id);
     }
 });
    
    
    
});

//DESTROY ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res)
{
Campground.findByIdAndRemove(req.params.id,function(err)
{
    if(err)
    {
        res.redirect("/campgrounds");
    }
    else{
        res.redirect("/campgrounds");  
    }
});
});


//TILL UPDATE ALL THE STATEMENTS ARE COMMENTED BECAUSE IT HAS BEEN MOVED TO MIDDLEWARE DIRECTORY

// the below middleware defines that a User which does not owns a campground should not be able to 
// update, delete or edit others campgrounds

//function checkCampgroundOwnership(req,res,next)
//{
  //    //now we have to check that the user who is logged in has the authorization to edit the campgrounds.
//    if(req.isAuthenticated)
  //  {
    //          Campground.findById(req.params.id,function(err,foundCampground){
      //          if(err)
        //        {
          //          res.redirect("back");
            //    }
//            else{
            //We have reached here which means that the user is logged in now we need to see that whether the 
            //user owns the campground or not. If he does not hw cannot edit.
            // Its a wonder that we are writing "equals" instead of == or  === because "req.user._id" is a string
            // and "foundCampground.author" is a mongoose object ID
                //if(foundCampground.author.id.equals(req.user._id))
                //{
                //next();
              //  }
            //    else{
          //          res.redirect("back");
        //            
      //          }
    //            }
  //  });      
//    }
    
    //else{
    //    res.redirect("back");
  //  }
//}





//UPDATE CAMPGROUND ROUTE
router.put("/:id",function(req,res){
 Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground)
 {
     if(err)
     {
         res.redirect("/campgrounds");
     }
     else
     {
         res.redirect("/campgrounds/"+req.params.id);
     }
 });
    
    
    
});

//DESTROY ROUTE
router.delete("/:id",function(req,res)
{
        Campground.findByIdAndRemove(req.params.id,function(err)
                {
                    if(err)
                    {
                        res.redirect("/campgrounds");
                    }
                    else{
                            res.redirect("/campgrounds");  
                        }
                });
});
module.exports = router;