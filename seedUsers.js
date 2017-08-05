const User = require('./server/models/User')
require('./server/dbConnection')

let user = {
  username: "fonzilla",
  password: "password123"
}

// new User(user)
// .save()
// .then(result => {
//   console.log(result);
// })
// .catch(err => {
//   console.log(err);
// })

User.findOne({ username: 'fonzilla' })
.then(result => {
  return result.comparePassword('password123')
})
.then(result => {
  console.log(result);
});
