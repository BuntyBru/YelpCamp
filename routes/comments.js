var express = require("express");
// THe {mergeParams:true} part is given here in order to merge the parameters of campground as well as comment. As req.params were not fulfilled
var router = express.Router({mergeParams:true});
var Campground= require("../models/campground");
var Comment= require("../models/comment");
var middleware=require("../middleware");


// Writing new comment
router.get("/new",middleware.isLoggedIn,function(req,res){
    
    Campground.findById(req.params.id, function(err, campground){
    if(err)
    {
        
                    req.flash("error","Please log in first");
        console.log(err);
        
    }
    else{
         res.render("comments/new",{campground:campground});
    }
    });
   
});

//posting the comments
router.post("/",middleware.isLoggedIn,function(req,res){
   
   //lookup campground using ID
   
   Campground.findById(req.params.id, function(err,campground)
   {
        if(err)
        {
            console.log(err);
        }
        else{
            //Create new comment
          Comment.create(req.body.comment,function(err,comment)
          {
              if(err)
              {
                  req.flash("error","Something went wrong");
                  console.log(err);
                  
              }
              else{
                  
                  // In oreder to know about the commentator of the respective comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  
                  comment.save();
                    //Connect new comment to campground
                  campground.comment1s.push(comment);
                  campground.save();
                  
                  req.flash("success","Successfully added comment");
                     //redirect campground show page
                  res.redirect('/campgrounds/'+ campground._id);
              }
          });
        }
   });
 


   
  
    
});


   //eDITING THE COMMENT, THE ROUTE IS BELOW
 router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
     Campground.findById(req.params.id, function(err,foundCampground){
         if(err || !foundCampground)
         {
             req.flash("error","Cannot find that campground");
        return res.redirect("back");
         }
          Comment.findById(req.params.comment_id,function(err,foundComment)
     {
         if(err)
         {
             res.redirect("back");
         }
         else{
                    res.render("comments/edit",{campground_id : req.params.id, comment: foundComment});
         }
     });
     });

   });
   
   
   //Updating the change done by EDIT
   router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res)
   {
       Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment)
       {
           if(err)
           {
               res.redirect("back");
           }
           else
           {
               res.redirect("/campgrounds/"+req.params.id);
           }
       });
   });



//Deletion
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    //findById and remove
   Comment.findByIdAndRemove(req.params.comment_id,function(err)
   {
       if (err)
       {
           res.redirect("back");
       }
       else
       {
           req.flash("success","Comment Deleted");  
           res.redirect("/campgrounds/"+req.params.id);
       }
   })
    
});






module.exports = router;

//function checkCommentOwnership(req,res,next)
//{
      //now we have to check that the user who is logged in has the authorization to edit the campgrounds.
  //  if(req.isAuthenticated)
//    {
          //    Comment.findById(req.params.comment_id,function(err,foundComment){
        //        if(err)
      //          {
    //                res.redirect("back");
  //              }
//            else{
            //We have reached here which means that the user is logged in now we need to see that whether the 
            //user owns the campground or not. If he does not hw cannot edit.
            // Its a wonder that we are writing "equals" instead of == or  === because "req.user._id" is a string
            // and "foundCampground.author" is a mongoose object ID
                  //  if(foundComment .author.id.equals(req.user._id))
                //    {
              //          next();
            //        }
          //          else
        //            {
      //                      res.redirect("back");
    //                
  //                  }
//                }
 //               });      
//    }
  //  
 //   else
//    {
    //    res.redirect("back");
  //  }
//}
