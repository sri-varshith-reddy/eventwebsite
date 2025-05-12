module.exports.renderSignupForm= (req,res)=>{
    res.render('users/signup'); 
}

module.exports.signUp =async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);

        req.login(registerUser, (err) => {
            if (err) {
                return next(err);  // Use `return` to prevent further execution
            }
            req.flash("success", "User was registered");
            return res.redirect("/listing");  // ✅ Only one redirect
        });
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup"); 
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login");   
} 

module.exports.login=async(req,res)=>{
    req.flash("Welcome back"); 
    console.log("Redirecting to:", res.locals.redirectUrl);
    res.redirect(res.locals.redirectUrl ||"/listing" );

} 

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err); 
        }
        else{
            req.flash("success","logged out "); 
            res.redirect("/listing")
        }
    })
}