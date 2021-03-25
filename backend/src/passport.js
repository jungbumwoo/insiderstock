import passport from "passport";
import FacebookStrategy from "passport-facebook";
import User from "./models/User.js";

passport.serializeUser(function(info, cb) {
    console.log("serializeUser is executed");
    console.log(info);
    cb(null, info);
})

passport.deserializeUser(function(info, cb) {
    console.log("deserializeUser is executed");
    cb(null, info);
})

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        const { name, id } = profile._json;
        User.findOne({ id }, async function(err, user) {
            if (err) { return done(err); }
            if (user) {
                console.log("user is exsist");
                console.log(user);
                let info = {
                    user,
                    accessToken
                }
                done(null, info);
            } else {
                user = new User({
                    id: id,
                    name: name
                });
                user.save(function(err) {
                    if(err){
                        console.log(err);
                    } else {
                        console.log("saving user..");
                        let info = {
                            user,
                            accessToken
                        }
                        done(null, info);
                    }
                })
            }
        });
    }
))