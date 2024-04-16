import { useEffect, useState } from "react";
import { fetchBannerImage } from "../Actions/action";

const Banner = () => {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const fetchData = async () => {
        try {
            const movie = await fetchBannerImage();
            console.log("movie = ", movie);
            setImage(movie.big_image);
            setTitle(movie.title)
            setDescription(movie.description)
        } catch (error) {
            console.log("error fetching data", error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="banner_div">
            <img src={image} alt="banner image" />
            <div className="banner_body">
                <h1>{title}</h1>
                <div className="banner_btns">
                    <button>Play</button>
                    <button>More Info</button>
                </div>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Banner;
