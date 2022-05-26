const User = require('../models/user');
const { appError, asyncHandleError } = require('../services/error');
const { getDecryptedJWT } = require('../services/auth');
const { errorMsg } = require('../services/enum');

const auth = asyncHandleError(async (req, res, next) => {
  const {
    headers: { authorization = '' },
  } = req;
  let token = '';
  if (authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  if (!token) {
    return next(appError(401, errorMsg.auth));
  }
  const decryptedData = getDecryptedJWT(token);
  if (!decryptedData) return next(appError(401, errorMsg.auth));

  const user = await User.findById(decryptedData.id);
  if (!user) return next(appError(401, errorMsg.auth));

  req.user = user;
  next();
});

module.exports = auth;
