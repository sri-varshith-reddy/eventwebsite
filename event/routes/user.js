const express=require("express");
const { register } = require("../models/listing");
const User = require("../models/user");
const passport=require("passport"); 
const wrapAsync = require("../utils/wrapAsync.js");
const {RedirectUrl}=require("../middleware.js");
const userController=require("../controllers/users.js");
const router = express.Router({ mergeParams: true }); 

router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signUp));

router.route("/login")
    .get(userController.renderLoginForm)
    .post(RedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true 
    }),
    userController.login
    )

router.get("/logout",userController.logout)

module.exports=router; 