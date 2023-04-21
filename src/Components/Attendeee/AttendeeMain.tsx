import React from "react";
import SideNavBar from "../SideNavBar";
import "../../StyleSheets/organizerM.scss";
import UpdateForm from "./updateProfile";
import ArtistList from "../ImageContainers/ArtistList";
import '../../StyleSheets/organizerMain.scss';
import MyComponent from "./FrontContent";

interface MainPageProps {}

const AttendeeMain: React.FC<MainPageProps> = () => {

    // const handleUpdateSuccess = () => {
    //     console.log("Update Success");
    // }

    return (
        <div>
            <div className= "organizer-main">
                <SideNavBar />
                <div className="organizer-main-content">
                    <MyComponent />
                </div>
                <div className="organizer-main-content">
                    <ArtistList />
                </div>
            </div>
        </div>
    );
};

export default AttendeeMain;