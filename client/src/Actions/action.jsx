import axios from "../Services/axiosConfig";

export const fetchBannerImage = async () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1; // Generates a random number between 1 and 100
    console.log(randomNumber);
    try {
        const movie = await axios.get(`/api/banner/${randomNumber}`);
        return movie.data.movie;
    } catch (error) {
        console.log("error fetching banner image ", error);
    }
};

export const fetchMovies = async (genre) => {
    try {
        const response = await axios.get(`/api/movies/${genre}`);
        return response.data.movies;
    } catch (error) {
        console.log("error fetching Movies ", error);
    }
};

export const post_signup = async (formData) => {
    try {
        const response = await axios.post("/api/signup", formData);
        console.log("Response from backend:",response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.response.data);
        return error.response.data;
    }
};
export const post_login = async (formData) => {
    try {
        const response = await axios.post("/api/login", formData);
        console.log("Response from backend:",response);
        return response.data;
    } catch (error) {
        console.error("Error:", error.response.data);
        return error.response.data;
    }
};
export const verify_otp = async (formData) => {
    try {
        const response = await axios.post("/api/verify-otp", formData);
        console.log("Response from backend:",response);
        return response.data;
    } catch (error) {
        console.error("Error:", error.response.data);
        return error.response.data;
    }
};

