const User = require('../models/user');
const BadAuthorizedError = require('../errors/unauthorized');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.code === 401) {
        next(new BadAuthorizedError('Ошибка авторизации'));
      } else {
        next();
      }
    });
};
