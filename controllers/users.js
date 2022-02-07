const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const { NOT_FOUND, BAD_REQUEST_ERROR, CONFLICT_ERROR } = require('../constants/error');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(new NotFoundError('Пользователи не найдены'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUsersId = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь с ID ${id} не найден`);
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.createUsers = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.code === CONFLICT_ERROR) {
        next(new ConflictError('Такой пользователь уже существует'));
      } if (err.code === BAD_REQUEST_ERROR) {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { name, about }, { new: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.code === NOT_FOUND) {
        next(new NotFoundError('Такого пользователя не существует'));
      } if (err.code === BAD_REQUEST_ERROR) {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { avatar }, { new: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.code === NOT_FOUND) {
        next(new NotFoundError('Такого пользователя не существует'));
      } if (err.code === BAD_REQUEST_ERROR) {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
