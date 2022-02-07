const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCards,
  likesCards,
  diselikesCards,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCards);
router.put('/:cardId/likes', likesCards);
router.delete('/:cardId/likes', diselikesCards);

module.exports = router;
