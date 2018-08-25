var mongoose = require("mongoose");
var Campground= require("./models/campground");
var Comment = require("./models/comment");
//the data array which we need in  order to put the data

var data =[{
    name:"Cloud's rest",
    image:"https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla ex turpis, vel aliquam nisi tempus a. Nulla facilisi. In fermentum enim at ipsum vulputate, ultricies gravida justo sollicitudin. Integer vehicula a tortor vel congue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut pretium a nibh ac aliquam. Curabitur congue orci felis, id consectetur odio rutrum id. Mauris in ex nunc. Curabitur ex nisi, suscipit nec condimentum ut, pretium sit amet lectus. Integer mollis suscipit mi vitae feugiat. Morbi ac augue quis magna gravida venenatis in id lorem. Aenean in arcu laoreet, volutpat justo ut, aliquam eros."
},
    {
    name:"Desert Mesa",
    image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla ex turpis, vel aliquam nisi tempus a. Nulla facilisi. In fermentum enim at ipsum vulputate, ultricies gravida justo sollicitudin. Integer vehicula a tortor vel congue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut pretium a nibh ac aliquam. Curabitur congue orci felis, id consectetur odio rutrum id. Mauris in ex nunc. Curabitur ex nisi, suscipit nec condimentum ut, pretium sit amet lectus. Integer mollis suscipit mi vitae feugiat. Morbi ac augue quis magna gravida venenatis in id lorem. Aenean in arcu laoreet, volutpat justo ut, aliquam eros."
    },
    {
    name:"Canvan Floor",
    image:"https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla ex turpis, vel aliquam nisi tempus a. Nulla facilisi. In fermentum enim at ipsum vulputate, ultricies gravida justo sollicitudin. Integer vehicula a tortor vel congue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut pretium a nibh ac aliquam. Curabitur congue orci felis, id consectetur odio rutrum id. Mauris in ex nunc. Curabitur ex nisi, suscipit nec condimentum ut, pretium sit amet lectus. Integer mollis suscipit mi vitae feugiat. Morbi ac augue quis magna gravida venenatis in id lorem. Aenean in arcu laoreet, volutpat justo ut, aliquam eros."
},
];



function seedDB(){
Campground.remove({},function(err)
{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Removed campgrounds");
    }
});

//The below code is for entering the data but for entering the data we need to have an actual data, So the abpve data array is that 
//Aas we know the data is an array therefore for fetching the data into the database we would need a forEach loop
// WE ARE PITTING IT IN HERE BECAUSE THERE IS NO GUARANTEE WHEN "REMOVE" will run it may run after create and we may loose our data
data.forEach(function(seed){
    Campground.create(seed, function(err,data){
        
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("Data has been inserted");
            //creating a comment regarding the campgrounds
            Comment.create(
                {
                    text:"This place is great, but I wish there was internet",
                    author:"Homer"
                }, function(err,comment){
                    if (err)
                    {
                        console.log(err);
                    }
                    else{
                        data.comment1s.push(comment);
                        data.save();
                    }
                });
            
        }
    });
    
    
});






}


module.exports= seedDB;