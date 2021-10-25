// create a test data set of valid users
require("dotenv").config();
require("./../../config/mongodb"); // fetch the db connection
const quoteModel = require("./../../models/Quotes.model"); // fetch the model to validate our user document before insertion (in database)
const userModel = require("./../../models/Users.model"); // fetch the model to validate our user document before insertion (in database)


const quotes = [
  {
    publisher: null,
    dateCreatedAt: new Date('2021-10-25T14:33:00'),
    quotes: [{
      user: "Marc",
      text: "C'est de la musique de niche de niche de niche !"
    },

    {
      user: "Denis",
      text: "Il faut être perché pour écouter ça !"
    },

    {
      user: "Marc",
      text: "Ou alors un tout petit chien..."
    }]
  }
];

(async function insertTestquotes() {
  try {
    await quoteModel.deleteMany(); // empty the quotes db collection
    const usersDb = await Promise.all([
      userModel.findOne({name: 'Paul'}),
      userModel.findOne({name: 'Marc'}),
      userModel.findOne({name: 'Joey'}),
    ]);
    quotes[0].publisher = usersDb[2]._id;
    const inserted = await quoteModel.insertMany(quotes); // insert docs in db
    console.log(`seed quotes done : ${inserted.length} documents inserted !`);
    await userModel.findOneAndUpdate(usersDb[0]._id, { $push: {
      favorites: quotes[0]._id,
      likes: quotes[0]._id
    }});
    console.log(`updated favorite like list`);
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
