const User = require('../models/user');
const { asyncHandleError } = require('../services/error');
const { getEncryptedPassword } = require('../services/validation');
const { getJWT } = require('../services/auth');

const auth = {
  // google oauth
  google: asyncHandleError(async (req, res, next) => {
    const {
      user: { sub, name, email, picture },
    } = req;
    let user = await User.findOne({ googleId: sub });
    if (!user) {
      const hash = await getEncryptedPassword(sub);
      const newUser = await User.create({
        name,
        email,
        password: hash,
        avatar: picture,
        googleId: sub,
      });
      user = newUser;
    }
    res.redirect(`${process.env.APP_URL}?token=${getJWT(user)}`);
  }),
};

module.exports = auth;
