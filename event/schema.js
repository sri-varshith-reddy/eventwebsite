const Joi = require("joi");

const ListingSchema = Joi.object({
    new: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        country: Joi.string().required(),
        location: Joi.string().required(),
        image: Joi.object({
            url: Joi.string().uri().required(),
            filename: Joi.string().optional()  // Allow filename field
        }).required(),
        price: Joi.number().required().min(0)
        ,
    category: Joi.string().valid(
      "Hackathons", "CodingContests", "Workshops", "AI/MLSummits",
      "Music", "Dance", "Drama", "FashionShows",
      "Football", "Cricket", "Esports", "Marathons",
      "Guest Lectures", "ResearchTalks", "StartupMeets",
      "CollegeFests", "DepartmentDays"
    ).required()
    }).required()
});

module.exports = { ListingSchema };
 

const ReviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5), 
        comment:Joi.string().required()
    }).required()
})

module.exports = { ListingSchema, ReviewSchema };