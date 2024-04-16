import { useEffect, useState } from "react";
import { fetchMovies } from "../Actions/action";

const Row = ({ title, genre }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movies = await fetchMovies(genre);
                console.log(`${genre} movies = `, movies);
                setMovies(movies);
            } catch (error) {
                console.log("error fetching data", error);
            }
        };
        fetchData();
    }, [genre]);

    return (
        <div className="row_div">
            <h2>{title}</h2>
            <div className="row">
                {movies.map((movie) => (
                    <div className="box" key={movie.rank}>
                        <img src={movie.image} alt="image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Row;
