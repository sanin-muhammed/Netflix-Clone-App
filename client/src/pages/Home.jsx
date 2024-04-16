import Header from "../Components/Header";
import Banner from "../Components/Banner";
import Row from "../Components/Row";
const Home = () => {
    return (
        <>
            <Header />
            <Banner />
            <Row title="Crime Series" genre="Crime" />
            <Row title="Action Series" genre="Action" />
            <Row title="Comedy Series" genre="Comedy" />
            <Row title="Animation Series" genre="Animation" />
            <Row title="Mystery Series" genre="Mystery" />
            <Row title="History Series" genre="History" />
        </>  
    );
};

export default Home;
