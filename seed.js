require("dotenv").config();
const connection = require("./config/connection");
const fetch = require("node-fetch");
const Movie = require("./models/Movie");
const apiKey = process.env.BEARER_TOKEN;

connection.on("error", (err) => console.error(err.message));

const movies = [];

const fetchData = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  }
  );
  const response = await res.json();
  response.results.forEach((m) => {
    const nextMovie = {   // put data in the structure you want with the names you want that match the schema
      title: m.title,
      poster_path: m.poster_path,
    };
    movies.push(nextMovie); // push to temp array
  });
  console.log("Got movies from API. Inserting into DB.....");
};

connection.once("open", async () => {
  try {
    console.log("Connected to db.");
    await fetchData();  // wait for the data and the temp array to be filled
    await Movie.deleteMany({});  // clean the old data
    await Movie.insertMany(movies);  // insert the data
    console.info(
      "Seeding complete! 🌱 Seeding complete! 🌱 Seeding complete! 🌱"
    );
    process.exit(0);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
});
