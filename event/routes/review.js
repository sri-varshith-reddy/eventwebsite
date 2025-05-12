const express=require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js"); 
const Review=require("../models/review.js");    
const {ValidateReview,loggedin,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

router.post("/", ValidateReview, loggedin,wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewid",loggedin,isReviewAuthor, wrapAsync(reviewController.destroyReview));
module.exports=router; 