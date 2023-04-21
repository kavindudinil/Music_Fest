import React, {useEffect, useState} from "react";
import '../../StyleSheets/organizerStyle/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import UpdateOrganizer from "./OrganizerDetailUpdater";


interface OrganizerData {
    organizerId: number,
    organizerName: string,
    password : string,
    email : string,
}

const MainContentO: React.FC = () => {

    const navigate = useNavigate();

    const [initialData, setInitialData] = useState<OrganizerData>({
        organizerId: 0,
        organizerName: "",
        password: "",
        email: "",
    });

    const [selectedOrganizer, setSelectedOrganizer] = useState<OrganizerData | null>(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const storageO = () => {
        const storedData = localStorage.getItem("organizerData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setInitialData(parsedData);
            console.log(parsedData);
        }
    }

    useEffect(() => {
        storageO()
    }, []);



    const handleUpdateButtonClick = (rowData: OrganizerData) => {
        setSelectedOrganizer(rowData);
        setShowUpdateForm(true);
        storageO()
    }

    const handleUpdateCancel = () => {
        setShowUpdateForm(false);
        setSelectedOrganizer(null);
        storageO()
    }

    const artistClick = () => {
        console.log("Artist");
        navigate('/artistListO');
    }
    const scheduleClick = () => {
        console.log("Schedule");
        navigate('/scheduleO');
    }

    return (
        <div className="primary-main">
            <div className="main-organizer">
                <div className="heading">
                    <p className="headingN">Hi! {initialData.organizerName}</p>
                    <p className="essay">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla ullamcorper, ornare nisl eget, dapibus metus. Fusce nec metus mattis quam rhoncus imperdiet et fringilla ante. Phasellus porttitor mollis dui, posuere consequat augue. Cras sem ipsum, ullamcorper sed placerat et, gravida et purus. In efficitur pulvinar leo a posuere. Vivamus varius mattis massa, vel finibus neque. Pellentesque ac a
                    </p>
                </div>
                <div className="main-organizer-content">
                    <section className="organizer-info">
                        <h2>Organizer Information</h2>
                        <div className="containerOrganizer">
                            <div>
                                <div className="organizer-info-content">
                                    <p>Organizer Name: {initialData.organizerName} </p>
                                    <p>Organizer Email: {initialData.email} </p>
                                    {/*<p>Organizer Phone Number: </p>*/}
                                    {/*<p>Organizer Address: </p>*/}
                                </div>
                            </div>
                            <div className="organizer-image">
                                <img className="pImage" src={require("../../Assets/imgs/people/albert-dera-ILip77SbmOE-unsplash.jpg") } />
                            </div>
                        </div>
                        <div className="update-button">
                            <button className="update" onClick={() => handleUpdateButtonClick(initialData)
                            }>Update</button>
                        </div>
                    </section>
                </div>
            </div>
            <div className="organizer-event">
                <div className="organizer-event-content1">
                    <h2>Event Information</h2>
                    <div className='details'>
                        <p>Lorem ipsam dolor sit amet consectetur, adipisicing elit. Accusamus, voluptate? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, nesciunt?</p>
                        <button className="Artist" onClick={artistClick}>Artist</button>
                    </div>
                </div>
                <div className="organizer-event-content2">
                    <h2>Event Information</h2>
                    <div className='details'>
                        <p>Lorem ipsam dolor sit amet consectetur, adipisicing elit. Accusamus, voluptate? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, nesciunt?</p>
                        <button className="Schedule" onClick={scheduleClick}>Schedule</button>
                    </div>
                </div>
            </div>
            {showUpdateForm && selectedOrganizer && (
                <UpdateOrganizer
                    initialValues={selectedOrganizer}
                    onCancel={handleUpdateCancel}
                 onSubmit={handleUpdateCancel}
                />
            )}
        </div>
    );
}

export default MainContentO;