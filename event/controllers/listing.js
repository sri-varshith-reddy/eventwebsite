const Listing = require("../models/listing.js");


module.exports.index = async (req, res) => {
    const { category } = req.query;

    let list;
    if (category) {
        list = await Listing.find({ category });
    } else {
        list = await Listing.find({});
    }

    res.render("listings/index.ejs", { list });
};
// controllers/aboutController.js
module.exports.renderAboutPage = (req, res) => {
    res.render("listings/about.ejs");
  };
  
  module.exports.renderContactPage = (req, res) => {
    res.render("listings/contact.ejs");
};
module.exports.submitContactForm = (req, res) => {
    req.flash("success", "Message sent successfully!");
    res.redirect("/listing/contact");
};

module.exports.renderFaqPage = (req, res) => {
    res.render("listings/faq.ejs");
  };
  module.exports.renderPrivacyPage = (req, res) => {
    res.render("listings/privacy.ejs");
};

module.exports.renderForm=async (req, res) => {  
        res.render("listings/new.ejs");
    }

module.exports.showListing=async (req, res) => {
        const { id } = req.params; 
        // let item = await Listing.findById(id).populate("reviews").populate("owner"); 
        let item = await Listing.findById(id)
            .populate({ path: "reviews",
                populate:{
                    path:"author"
                } 
             })
            .populate({ path: "owner", select: "username email" });
        // console.log(item); 
        // console.log("Populated Owner:", item.owner);  
        if(!item){
            req.flash("error","does not exist"); 
            return res.redirect("/listing"); 
        }
        res.render("listings/show.ejs", { item })
    }
    module.exports.createListing = async (req, res) => {
        if (!req.file) {
            req.flash("error", "Image upload failed!");
            return res.redirect("/listing/new");
        }
    
        let url = req.file.path;
        let filename = req.file.filename;
    
        const list = new Listing(req.body.new); 
        list.owner = req.user._id;        
        list.image = { url, filename }; // Manually attach the image                                  
        await list.save(); 
    
        req.flash("success", "New listing created");
        res.redirect("/listing");
    };
    
module.exports.renderEditForm=async (req, res) => {
    const { id } = req.params; 
    let item = await Listing.findById(id);
    res.render("listings/edit.ejs", { item })  
    } 
module.exports.updateListing=async (req, res) => {
    if(!req.body.new){
        throw new ExpressError(400,"Send valid data for listing")
    } 
    const { id } = req.params;
    let list=await Listing.findByIdAndUpdate(id, { ...req.body.new });

    if(typeof(req.file)!=="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    list.image = { url, filename };
    await list.save();
    }
    req.flash("success","listing updated")
    res.redirect(`/listing/${id}`);
} 
module.exports.destroyListing=async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","listing deleted")
    res.redirect("/listing");
}