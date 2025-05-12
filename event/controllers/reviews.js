const Listing = require("../models/listing.js"); 
const Review=require("../models/review.js"); 

module.exports.createReview=async(req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review); 
    newReview.author=req.user._id; 
    console.log(newReview);

    listing.reviews.push(newReview); 
    await newReview.save(); 
    await listing.save();
    console.log("review saved successfully");
    req.flash("success","New review created")
    res.redirect(`/listing/${listing._id}`);
}

module.exports.destroyReview=async (req, res) => {
    let { id, reviewid } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } , new: true });
    await Review.findByIdAndDelete(reviewid);
    res.redirect(`/listing/${id}`);
    req.flash("success","review Deleted ")
}