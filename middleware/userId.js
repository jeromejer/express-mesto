const userId = (req, res, next) => {
  req.user = {
    _id: '61fd2c9503ca5062c5e51c31',
  };

  next();
};

module.exports = userId;
