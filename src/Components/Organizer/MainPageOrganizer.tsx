import React from "react";
import SideNavBar from "../SideNavBar";
import MyComponent from "../Attendeee/FrontContent";
import ArtistList from "../ImageContainers/ArtistList";
import MainContentO from "./MainContentO";

interface MainPageProps {}

const OrganizerMainPage: React.FC<MainPageProps> = () => {

    // const handleUpdateSuccess = () => {
    //     console.log("Update Success");
    // }

    return (
        <div>
            <MainContentO />
        </div>
    );
};

export default OrganizerMainPage;