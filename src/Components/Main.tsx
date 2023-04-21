import React from "react";
import NavigationBar from "./NavigationMain";
import MainContent from "./MainContent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPageAttendee from "./Organizer/loginAttendee";
import LoginPageOraganizer from "./Attendeee/loginO";
// import LoginPageAdmin from "./Administrator/loginAdmin";
import AttendeeMain from "./Attendeee/AttendeeMain";
import SignupForm from "./Attendeee/signuUpO";
import ArtistList from "./ImageContainers/ArtistList";
import AttendeeForm from "./Attendeee/updateProfile";
import ScheduleTable from "./Attendeee/viewSchedule";
import OrganizerMainPage from "./Organizer/MainPageOrganizer";
import ArtistO from "./Organizer/Artist/Artist";
import AddArtist from "./Organizer/Artist/AddArtist";
import ScheduleO from "./Organizer/Schedule/schedule";
import LoginPageAdministartor from "./Administrator/LoginAdmin";
import MainContentA from "./Administrator/MainPageA";
import ArtistA from "./Administrator/artist/ArtistA";
import OrganizerA from "./Administrator/organizer/OrganizerA";
import AttendeeA from "./Administrator/attendee/AttendeeA";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
    return (
        <div>
            <BrowserRouter>
                <NavigationBar />
                {/*<switch>*/}
                    <Routes>
                        {/*<switch>*/}
                            <Route path="/login" element={<LoginPageAttendee />} />
                            <Route path="/OrganizerLogin" element={<LoginPageOraganizer />} />
                            <Route path="/" element={<MainContent />} />
                            <Route path="/organizerMain" element={<AttendeeMain />} />
                            <Route path="/signIn" element={<SignupForm />} />
                            <Route path="/updateProfile" element={<AttendeeForm />} />
                            <Route path="/scheduleTable" element={<ScheduleTable />} />
                            <Route path="/organizerMainPage" element={<OrganizerMainPage />} />
                            <Route path="/artistListO" element={<ArtistO />} />
                            <Route path="/artistList" element={<AddArtist  onSubmit={console.log}  onCancel={console.log} />} />
                            <Route path="/scheduleO" element={<ScheduleO />} />
                            <Route path="/loginAdmin" element={<LoginPageAdministartor />} />
                            <Route path="/adminListA" element={<MainContentA />} />
                            <Route path="/artistListA" element={<ArtistA />} />
                            <Route path="/organizerA" element={<OrganizerA />} />
                            <Route path="/attendeeA" element={<AttendeeA />} />
                        {/*</switch>*/}
                    </Routes>
                {/*</switch>*/}

            </BrowserRouter>


        </div>
    );
};

export default MainPage;
