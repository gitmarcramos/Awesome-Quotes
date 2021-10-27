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
    }],

    hashtags: ["Awesome", "chien", "Ironhack"]

  },

  {
    publisher: null,
    dateCreatedAt: new Date('2021-10-25T14:58:00'),
    quotes: [{
      user: "Paul",
      text: "Dev doing deving !"
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
    quotes[1].publisher = usersDb[0]._id;
    quotes[0].likes = 1;
    quotes[1].likes = 1;
    quotes[0].favorites = 1;
    const inserted = await quoteModel.insertMany(quotes); // insert docs in db
    console.log(`seed quotes done : ${inserted.length} documents inserted !`);

    const quotesDb = await quoteModel.find();
    await userModel.findOneAndUpdate({name: 'Paul'}, { $push: {
      favorites: quotesDb[0]._id,
      likes: {
        $each: [quotesDb[0]._id, quotesDb[1]._id]
      }
    }});
    console.log(`updated favorite like list`);
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
