require("dotenv").config();
const connection = require("./config/connection");
const fetch = require("node-fetch");
const Movie = require("./models/Movie");
const apiKey = process.env.API_KEY;

connection.on("error", (err) => console.error(err.message));

const movies = [];

const fetchData = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing/?api_key=${apiKey}`
  );
  const response = await res.json();
  response.results.forEach((m) => {
    const nextMovie = {
      title: m.title,
      poster_path: m.poster_path,
    };
    movies.push(nextMovie);
  });
  console.log("Got movies from API. Ready to insert into DB.");
};

connection.once("open", async () => {
  try {
    console.log("Connected to db.");
    await fetchData();
    await Movie.deleteMany({});
    await Movie.insertMany(movies);
    console.info(
      "Seeding complete! 🌱 Seeding complete! 🌱 Seeding complete! 🌱"
    );
    process.exit(0);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
});
