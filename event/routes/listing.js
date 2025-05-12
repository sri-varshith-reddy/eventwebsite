    const express=require("express"); 
    const wrapAsync = require("../utils/wrapAsync.js")
    const Listing = require("../models/listing.js");
    const NewSchema=require("../schema.js"); 
    const {loggedin,isOwner,validatelisting}=require("../middleware.js");
    const listingController=require("../controllers/listing.js")
    const multer=require("multer"); 
    const {storage}=require("../cloudConfig.js"); 
    const upload=multer({storage}); 
    const router=express.Router(); 


    router 
    .route("/")
    .get(wrapAsync(listingController.index))//index
    .post( loggedin, upload.single('new[image]'), validatelisting, wrapAsync(listingController.createListing));

    router.get("/contact", listingController.renderContactPage);
    router.post("/contact", listingController.submitContactForm);
    router.get("/faq", listingController.renderFaqPage); 
    router.get("/privacy", listingController.renderPrivacyPage); 
// Use listingController instead:
  router.get("/about", listingController.renderAboutPage);


    router.get("/new", loggedin, wrapAsync(listingController.renderForm))//new

    router 
    .route("/:id")
    .get( wrapAsync(listingController.showListing)) //show
    .put( loggedin,upload.single('new[image]'),validatelisting,isOwner,wrapAsync(listingController.updateListing))//update 
    .delete(loggedin, isOwner,wrapAsync(listingController.destroyListing)); //delete



    router.get("/:id/edit",loggedin,isOwner, wrapAsync(listingController.renderEditForm))

    module.exports=router; 