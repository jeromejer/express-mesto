const Cards = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/bad-request-error');
const BAD_REQUEST_ERROR = require('../constants/error');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .orFail(new NotFoundError('Карточки не найдены'))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Cards.create({ name, link, owner })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.code === BAD_REQUEST_ERROR) {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCards = (req, res, next) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch(next);
};

module.exports.likesCards = (req, res, next) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.diselikesCards = (req, res, next) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.send({ data: card }))
    .catch(next);
};