//first call with (db, bcrypt) and then (req, res)
const handleSignin = (db, bcrypt) => (req, res) => {

    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(400).json('incorrect form submission');      
    }

    db
      .select('email', 'hash')
      .from('logins')
      .where('email', '=', email)
      .then(logins => {
        const isValid = bcrypt.compareSync(password, logins[0].hash)
        if (isValid) {
          db
            .select('*')
            .from('users')
            .where('email', '=', email)
            .then(users => {
              res.json(users[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        } else {
          res.status(400).json('wrong credentions')
        }
      })
      .catch(err => res.status(400).json('error logging in'))
  }

module.exports = {
    handleSignin:handleSignin
}