const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

console.log(process.env.GOOGLE_CALLBACK_URL);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile._json);
    }
  )
);
