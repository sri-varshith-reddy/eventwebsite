const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js"); 
const ListingSchema = new Schema({
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: {
            filename: { type: String },
            url: { type: String }
        },
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: "INDIA"
    } ,
    
    reviews:[
        {
            type:Schema.Types.ObjectId, 
            ref:"Review"
        }
    ],
    category: {
        type: String,
        enum: [
          "Hackathons", "CodingContests", "Workshops", "AI/MLSummits",
          "Music", "Dance", "Drama", "FashionShows",
          "Football", "Cricket", "Esports", "Marathons",
          "Guest Lectures", "ResearchTalks", "StartupMeets",
          "CollegeFests", "DepartmentDays"
        ],
        required: true
      },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});
ListingSchema.pre("findOneAndDelete", async function (next) {
    let listing = await this.model.findOne(this.getQuery()); // Get the listing before deletion
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
    next();
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;   