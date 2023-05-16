require("dotenv").config();
const connection = require("./config/connection");
const fetch = require("node-fetch");
const Movie = require("./models/Movie");
const apiKey = process.env.API_KEY;

connection.on("error", (err) => err);

const movies = [];

fetch(`https://api.themoviedb.org/3/movie/now_playing/?api_key=${apiKey}`)
  .then((response) => response.json())
  .then((response) => {
    response.results.forEach((m) => {
      const nextMovie = {
        title: m.title,
        poster_path: m.poster_path,
      };
      movies.push(nextMovie);
    });
  })
  .catch((err) => console.error(err));

connection.once("open", async () => {
  console.log("Connected to db.");
  try {
    await Movie.deleteMany({});
    await Movie.insertMany(movies);
    console.info("Seeding complete! 🌱");
    process.exit(0);
  } catch (error) {
    console.log(error.message);
  }
});
