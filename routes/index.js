const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require("../models/user")

//landing page route
router.get("/", function (req, res) {  
    res.render("landing")
})



//AUTH ROUTE
// show register form
router.get("/register", function(req, res){
    res.render("register"); 
});
//handle sign up logic
router.post("/register", function(req, res){
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message)
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelpcamp " + user.username)
            res.redirect("/campgrounds"); 
        });
    });
});

//show login form
router.get("/login", function (req, res) {  
    res.render("login")
})

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function (req, res) {  
    
})

//logout route
router.get("/logout", function (req, res) {  
    req.logOut()
    req.flash("success", "logged you out!")
    res.redirect("/campgrounds")
})




module.exports = router