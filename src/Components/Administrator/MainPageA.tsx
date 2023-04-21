import React, {useEffect, useState} from "react";
import "../../StyleSheets/administratorStyle/mainpage.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import UpdateOrganizerA from "./AdmiDetailUpdater";



interface OrganizerData {
    organizerId: number,
    organizerName: string,
    password : string,
    email : string,
}

const MainContentA: React.FC = () => {

    const navigate = useNavigate();

    const [initialData, setInitialData] = useState<OrganizerData>();

    const [selectedOrganizer, setSelectedOrganizer] = useState<OrganizerData | null>(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const storage = () => {
        const storedData = localStorage.getItem("AdministratorData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setInitialData(parsedData);
            console.log(parsedData);
            console.log(initialData);
        }
    }

    useEffect(() => {
        storage();
    }, []);



    const handleUpdateButtonClick = (rowData: OrganizerData) => {
        setSelectedOrganizer(rowData);
        setShowUpdateForm(true);
        storage();
    }

    const handleUpdateCancel = () => {
        setShowUpdateForm(false);
        setSelectedOrganizer(null);
        storage();
        // storage();
    }

    const artistClick = () => {
        console.log("Artist");
        navigate('/artistListA');
    }
    const scheduleClick = () => {
        console.log("Schedule");
        navigate('/scheduleO');
    }
    const organizerClick = () => {
        console.log("Attendeee");
        navigate('/organizerA');
    }
    const attendeeClick = () => {
        console.log("Organizer");
        navigate('/attendeeA');
    }
    console.log(selectedOrganizer?.organizerName);

    return (
        <div className="primary-mainA">
            <div className="main-contentB">
                <div className="main-organizerA">
                    <div className="headingA">
                        <p className="headingNA">Hi! {initialData?.organizerName}</p>
                        <p className="essayA">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla ullamcorper, ornare nisl eget, dapibus metus. Fusce nec metus mattis quam rhoncus imperdiet et fringilla ante. Phasellus porttitor mollis dui, posuere consequat augue. Cras sem ipsum, ullamcorper sed placerat et, gravida et purus. In efficitur pulvinar leo a posuere. Vivamus varius mattis massa, vel finibus neque. Pellentesque ac a
                        </p>
                    </div>
                    <div className="main-organizer-contentA">
                        <section className="organizer-infoA">
                            <h2>Admin Information</h2>
                            <div className="containerOrganizerA">
                                <div>
                                    <div className="organizer-info-contentA">
                                        <p>Organizer Name: {initialData?.organizerName}</p>
                                        <p>Organizer Email: {initialData?.email}</p>
                                        {/*<p>Organizer Phone Number: </p>*/}
                                        {/*<p>Organizer Address: </p>*/}
                                    </div>
                                </div>
                                <div className="organizer-imageA">
                                    <img className="pImageA" src={require("../../Assets/imgs/people/toa-heftiba-O3ymvT7Wf9U-unsplash.jpg") } />
                                </div>
                            </div>
                            <div className="update-buttonA">
                                <button className="updateA" onClick={() => handleUpdateButtonClick(initialData as OrganizerData)
                                }>Update</button>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="organizer-eventA">
                    <div className="organizer-event-contentM">
                        <div className="organizer-event-content2A">
                            <h2>Event Information</h2>
                            <div className='detailsA'>
                                <p>Lorem ipsam dolor sit amet consectetur, adipisicing elit. Accusamus, voluptate? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, nesciunt?</p>
                                <button className="ArtistA" onClick={artistClick}>Artist</button>
                            </div>
                        </div>
                        <div className="organizer-event-content2A">
                            <h2>Event Information</h2>
                            <div className='detailsA'>
                                <p>Lorem ipsam dolor sit amet consectetur, adipisicing elit. Accusamus, voluptate? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, nesciunt?</p>
                                <button className="ScheduleA" onClick={scheduleClick}>Schedule</button>
                            </div>
                        </div>
                    </div>
                    <div className="organizer-event-contentM">
                        <div className="organizer-event-content2A">
                            <h2>Event Information</h2>
                            <div className='detailsA'>
                                <p>Lorem ipsam dolor sit amet consectetur, adipisicing elit. Accusamus, voluptate? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, nesciunt?</p>
                                <button className="ScheduleA" onClick={organizerClick}>Organizer</button>
                            </div>
                        </div>
                        <div className="organizer-event-content2A">
                            <h2>Event Information</h2>
                            <div className='detailsA'>
                                <p>Lorem ipsam dolor sit amet consectetur, adipisicing elit. Accusamus, voluptate? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, nesciunt?</p>
                                <button className="ScheduleA" onClick={attendeeClick}>Attendee</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showUpdateForm && selectedOrganizer && (
                <UpdateOrganizerA
                    initialValues={selectedOrganizer}
                    onCancel={handleUpdateCancel}
                    onSubmit={handleUpdateCancel}
                />
            )}
        </div>
    );
}

export default MainContentA;