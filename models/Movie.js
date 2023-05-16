const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
    },   
  },
  {
    toJSON: {
      //getters and virtuals ????
    },
    id: false  // we do not the String copy of the ObjectId
  }
);

const Movie = model('movie', movieSchema);

module.exports = Movie;
