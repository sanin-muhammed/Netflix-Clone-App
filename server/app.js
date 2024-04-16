const colors = require("colors");
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const connectDB = require("./config/database");
const Movies = require("./models/movies");
const PORT = 5000;
const app = express();

// connect mongodb
connectDB();

app.use(cors());
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.urlencoded());
app.use(express.json());

// Use cookie-parser middleware
app.use(cookieParser());

// movie routes

const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes")
app.use('/api',movieRoutes);
app.use('/api',authRoutes);




app.listen(PORT, () => console.log(` app listening on PORT ${PORT} !`));
