const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
  
    db
      .select('*')
      .from('users')
      .where({ id: id })
      .then(users => {
        if (users.length > 0) {
          res.json(users[0]);
        } else {
          res.status(400).json('not found');
        }      
      })
      .catch(err => res.status(400).json('problem finding user'))
  };

  module.exports = {
    handleProfileGet:handleProfileGet
  }