const router = require('express').Router();
const {
  getUsers, getUsersId, createUsers, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUsersId);
router.post('/', createUsers);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
