const Clarifai = require('Clarifai');

const app = new Clarifai.App({
  apiKey: 'c69fc3ba154b477994dbfd15ba9c7701',
});

const handleApiCall = (req, res) =>{
  app.models.predict(Clarifai.CELEBRITY_MODEL, req.body.input)
  .then(data => res.json(data))
  .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body
  
    db('users')
      .where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
        res.json(entries[0])
      })
      .catch(err => res.status(400).json('error updating user'))
  };

  module.exports = {
      handleImage,
      handleApiCall,
  }