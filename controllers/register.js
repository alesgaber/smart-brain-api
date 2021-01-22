// REGISTER
const handleRegister=(req, res, db, bcrypt) => {
    const { name, email, password } = req.body

    if (!name || !password || !email) {
      return res.status(400).json('incorrect form submission');      
    }
  
    const hash = bcrypt.hashSync(password)
    db
      .transaction(trx => {
        trx
          .insert({
            hash,
            email
          })
          .into('logins')
          .returning('email')
          .then(loginEmail => {
            // če ni return-a, potem je avtomatsko transaction commit
            return trx('users')
              .returning('*')
              .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
              })
              .then(users => {
                res.json(users[0])
              })
          })
          .then(trx.commit)
          .catch(trx.rollback)
      })
      .catch(err => res.status(400).json('unable to register'))
  }

  module.exports = {
      handleRegister: handleRegister
  }