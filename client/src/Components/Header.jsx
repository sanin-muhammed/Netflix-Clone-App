import { useEffect, useState } from "react";
import logo from "../assets/Netflix_Logo.png";
import profile_icon from "../assets/profile_icon.png";
const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY === 0) {
                setScrolled(false);
            } else {
                setScrolled(true);
            }
        }
        window.addEventListener("scroll", handleScroll);
    });
    return (
        <nav className={scrolled && "scrolled"}>
            <div className="brand">
                <img src={logo} alt="" />
            </div>
            <div className="menu">
                <div className="main_menu">
                    <a href="#">Home</a>
                    <a href="#">TV Shows</a>
                    <a href="#">Movies</a>
                    <a href="#">New & Popular</a>
                    <a href="#">My List</a>
                    <a href="#">Browse by languages</a>
                </div>
                <div className="secondary_menu">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                    </div>
                    <div>
                        <a href="#">Children</a>
                    </div>
                    <div className="icon ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
                        </svg>
                    </div>
                    <div className="dropdown">
                        <img src={profile_icon} alt="" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
