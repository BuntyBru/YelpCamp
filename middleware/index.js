var Campground= require("../models/campground");
var Comment= require("../models/comment");
// All the middleware goes here

var middlewareObj={};
middlewareObj.checkCampgroundOwnership= function(req,res,next)
{
      //now we have to check that the user who is logged in has the authorization to edit the campgrounds.
    if(req.isAuthenticated)
    {
              Campground.findById(req.params.id,function(err,foundCampground){
                if(err || !foundCampground)
                {
                    
                    req.flash("error","Campground not found");
                    res.redirect("back");
                }
            else{
            //We have reached here which means that the user is logged in now we need to see that whether the 
            //user owns the campground or not. If he does not hw cannot edit.
            // Its a wonder that we are writing "equals" instead of == or  === because "req.user._id" is a string
            // and "foundCampground.author" is a mongoose object ID
                if(foundCampground.author.id.equals(req.user._id))
                {
                next();
                }
                else{
                    res.redirect("back");
                    
                }
                }
    });      
    }
    
    else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}
    
    
    


middlewareObj.checkCommentOwnership = function(req,res,next)
{
      //now we have to check that the user who is logged in has the authorization to edit the campgrounds.
    if(req.isAuthenticated)
    {
              Comment.findById(req.params.comment_id,function(err,foundComment){
                if(err || !foundComment)
                {
                    req.flash("error","Comment not found");
                    res.redirect("back");
                }
            else{
            //We have reached here which means that the user is logged in now we need to see that whether the 
            //user owns the campground or not. If he does not hw cannot edit.
            // Its a wonder that we are writing "equals" instead of == or  === because "req.user._id" is a string
            // and "foundCampground.author" is a mongoose object ID
                    if(foundComment .author.id.equals(req.user._id))
                    {
                        next();
                    }
                    else
                    {
                           req.flash("error","You dont have permission to do that");
                            res.redirect("back");
                    
                    }
                }
                });      
    }
    
    else
    {
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn= function(req,res,next)
{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Log in first!");// This is used for the flash message, But please be noted that this is not going to put up
    //messages in the page, This is supposed to be handled by the route below:-
    res.redirect("/login");
}



module.exports= middlewareObj;