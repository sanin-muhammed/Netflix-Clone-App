const Movies = require("../models/movies");
const colors = require('colors');

exports.get_banner_image = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("id =", id);
        const movie = await Movies.findOne({ rank: id });
        console.log('banner image = '.yellow,movie.big_image.green);
        res.status(200).json({ movie });
    } catch (error) {
        console.log("error finding movie using id", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.get_movies_by_genre =async (req,res)=>{
    try {
        const genre = req.params.genre;
        const movies = await Movies.find({genre:genre});
        console.log(`success finding ${genre.yellow} movies `);
        res.status(200).json({movies})

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
