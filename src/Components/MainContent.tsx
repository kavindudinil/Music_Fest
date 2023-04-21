import React from "react";
import "../StyleSheets/mainStyle.scss";
import ArtistList from "./ImageContainers/ArtistList";

interface MainPageProps {}

const MainContent: React.FC<MainPageProps> = () => {
    return (
        <div>
            <div className="main">
                <div className="main-page">
                    <img src={require("../Assets/imgs/pexels-ingo-joseph-1755087 (1).jpg")} />
                    <h1>Welcome to the Main Page</h1>
                    <p>Please log in as an organizer, administrator, or attendee.</p>
                </div>
                <br/>
                <div className="main-page2">
                    <div className="Image">
                        <img src={require("../Assets/imgs/pexels-harrison-haines-3172566.jpg")} />
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl
                    </p>
                </div>
                <div className="main-page2">
                    <div className="Image">
                        <img src={require("../Assets/imgs/pexels-harrison-haines-3172566.jpg")} />
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl
                    </p>
                </div>
                <ArtistList />
            </div>
        </div>
    );
};

export default MainContent