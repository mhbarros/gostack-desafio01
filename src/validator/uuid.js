const {validate} = require('uuid')

const validateUUID = (req, res, next) => {
  const {id} = req.params;

  if(!validate(id)){
    return res.status(400).json({msg: 'Invalid repository ID.'});
  }

  next();
}

module.exports = {
  validateUUID
}