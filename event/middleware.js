const Listing=require("./models/listing");
const Review=require("./models/review.js"); 
const { ListingSchema, ReviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");


let loggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","you must be logged in to create listing!"); 
        req.session.redirectUrl = req.originalUrl; 
        return res.redirect("/login"); 
    }
    next(); 
}; 

let RedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        console.log("Session Redirect URL:", req.session.redirectUrl);
        res.locals.redirectUrl = req.session.redirectUrl; // Assign correct URL
        console.log("Locals Redirect URL:", res.locals.redirectUrl);
        delete req.session.redirectUrl; // Remove it after use
    } else {
        res.locals.redirectUrl = "/listing"; // Use a valid fallback route
    }
    next();
};


let isOwner=async (req,res,next)=>{
        const { id } = req.params;
            let listing=await Listing.findById(id);
            if(!listing.owner.equals(res.locals.currUser._id)){
                req.flash("error", "Access denied!");
                return res.redirect(`/listing/${id}`);
            }
        next();
}

let validatelisting = (req, res, next) => {
    // If file upload exists, attach its data to req.body.new.image
    if (req.file) {
        req.body.new.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    let { error } = ListingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

let ValidateReview=(req,res,next)=>{
        let {error}=ReviewSchema.validate(req.body); 
        if(error){
            throw new ExpressError(400,error)
        }   
        else{
            next(); 
        }
    };


let isReviewAuthor=async (req,res,next)=>{
        const { id,reviewid} = req.params;
            let review=await Review.findById(reviewid);
            if(!review.author.equals(res.locals.currUser._id)){
                req.flash("error", "You dont have permission to delete!");
                return res.redirect(`/listing/${id}`);
            }
        next();
}


module.exports = { loggedin, isOwner,RedirectUrl,validatelisting,ValidateReview,isReviewAuthor}; 