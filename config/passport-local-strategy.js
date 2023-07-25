const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback: true
    },

   async function(req,email,password,done){
      
        try{
        const user= await User.findOne({email:email});
        console.log(email);
        if(!user||user.password!=password){
            req.flash('error', 'Invalid username or password');
            return done(null,false);
        }

        return done(null,user);
    }
    catch(err){
        req.flash('error', err);
        return done(err);
    }
}

));


passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(async function(id,done){
    const user=await User.findById(id)
    try{
        
        return done(null,user);
    }
    catch(err){
        console.log('Error in finding user --> Passport');
        return done(err);
    }
});
   
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;