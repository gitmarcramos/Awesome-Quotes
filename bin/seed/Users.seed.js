// create a test data set of valid users
require("dotenv").config();
require("./../../config/mongodb"); // fetch the db connection
const userModel = require("./../../models/Users.model"); // fetch the model to validate our user document before insertion (in database)
const bcrypt = require("bcrypt");

const users = [
  {
    name: "Paul",
    pseudo: "TheJohn841",
    mail: "jazz@mail.com",
    password: "123",
    creationDate: new Date('2021-10-22T10:02:31'),
  },

  {
    name: "Marc",
    pseudo: "MarcWeb",
    mail: "marc@mail.com",
    password: "",
    role: "admin",
    creationDate: new Date('2021-10-18T15:00:00'),
  },
  
  {
    name: "Joey",
    pseudo: "Hang",
    mail: "superuser@mail.com",
    password: "",
    description: "I'm Joey and I love Awesome Quotes !",
    creationDate: new Date('2021-10-18T15:12:45'),
  },
];

(async function insertTestusers() {
  try {
    await userModel.deleteMany(); // empty the users db collection
    const hashedPassword = bcrypt.hashSync("123", 10);
      users[0].password = hashedPassword;
      users[1].password = hashedPassword;
      users[2].password = hashedPassword;
    const inserted = await userModel.insertMany(users); // insert docs in db
    console.log(`seed users done : ${inserted.length} documents inserted !`);
    const usersDb = await Promise.all([
      userModel.findOneAndUpdate(inserted[0]._id, { $push: {
        following: inserted[2]._id,
      }
    }),
      userModel.findByIdAndUpdate(inserted[2]._id,{ $push: {
        followers: inserted[0]._id
      }}),
    ]);
    console.log(`update users done : ${usersDb.length} documents updated !`);
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
