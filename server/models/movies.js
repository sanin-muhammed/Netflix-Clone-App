const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    rank: {
        type: Number,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    big_image: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    genre: {
        type: Array,
    },
    imdb_link: {
        type: String,
    },
    rating: {
        type: Number,
    },
    year: {
        type: String,
    },
});

const Movies = mongoose.model("movies", movieSchema);
// export Movies collection
module.exports = Movies;
