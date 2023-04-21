import React, { useEffect, useState } from "react";
import axios from '../../../Config/AxiosBase';
// import "../../StyleSheets/organizerStyle/artistO.scss"
import UpdateSchedule from "./UpdateSchedule";
import AddSchedule from "./AddSchedule";


interface ScheduleProps {
    date: string;
    time: string;
    artistId: number;
    itemId: number;
    stage: string;
}

interface OrganizerDataS {
    organizerId: number,
    organizerName: string,
    password: string,
    email: string,
}

const ScheduleO: React.FC = () => {

    const [schedule, setSchedule] = useState<Array<ScheduleProps>>([]);
    const [initialData, setInitialData] = useState<OrganizerDataS>({
        organizerId: 0,
        organizerName: "",
        password: "",
        email: "",
    });
    const [selectedArtist, setSelectedArtist] = useState<ScheduleProps | null>(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState<ScheduleProps>({
        date: "",
        time: "",
        artistId: 0,
        itemId: 0,
        stage: "",
        }
    );



    useEffect(() => {
        const storedData = localStorage.getItem("organizerData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setInitialData(parsedData);
            console.log(parsedData);
        }
    }, []);

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                console.log(initialData.organizerId);
                const response = await axios.get(`/schedule/getSchedule`);
                console.log(response.data.content);
                setSchedule(response.data.content);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTableData();
    }, [initialData.organizerId]);

    const handleDeleteButtonClick = (rowData: ScheduleProps) => {
        axios.delete(`/schedule/deleteSchedule/${rowData.itemId}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                const newSchedule = schedule.filter((item) => item.itemId !== rowData.itemId);
                setSchedule(newSchedule);
                alert("Schedule Deleted Successfully")
            }).catch(err => {
            console.log(err);
        });
    }


    const handleAddButtonClick = () => {
        setShowAddForm(true);
    }



    const handleAddFormClose = () => {
        setShowAddForm(false);
        setFormData({
            date: "",
            time: "",
            artistId: 0,
            itemId: 0,
            stage: "",
        });
    };
    const handleAddFormCancel = () => {
        setShowAddForm(false);
        setFormData({
            date: "",
            time: "",
            artistId: 0,
            itemId: 0,
            stage: "",
        });
    };


    const handleUpdateButtonClick = (rowData: ScheduleProps) => {
        setSelectedArtist(rowData);
        setShowUpdateForm(true);
    }

    const handleUpdateFormClose = () => {
        setShowUpdateForm(false);
        setSelectedArtist(null);
    }

    return (
        <div className="containerP">
            <h1>Artist</h1>
            <br/>
            <br/>
            <br/>
            <h1 className="headingM">Schedule Details</h1>
            <p className="paraM">Here you can view the schedule details</p>
            <div className="container container-customN">
                <div className="row row-customN">
                    {schedule.map((rowData, index) => (
                        <div key={index} className="col-md-4">
                            <div className="card mb-4 card-body-custom">
                                <div className="card-body rounded ">
                                    <h5 className="card-title">Row #{index + 1}</h5>
                                    <p className="card-text">
                                        <strong>ItemID: </strong>
                                        {rowData.itemId}
                                    </p>
                                    <p className="card-text">
                                        <strong>ArtistID: </strong>
                                        {rowData.artistId}
                                    </p>
                                    <p className="card-text">
                                        <strong>Stage: </strong>
                                        {rowData.stage}
                                    </p>
                                    <p className="card-text">
                                        <strong>Date: </strong>
                                        {rowData.date}
                                    </p>
                                    <p className="card-text">
                                        <strong>Time: </strong>
                                        {rowData.time}
                                    </p>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => handleUpdateButtonClick(rowData)}
                                    >
                                        Update
                                    </button>
                                    <button onClick={() => handleDeleteButtonClick(rowData)}
                                            className="btn btn-danger">
                                        Delete</button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="btn btn-primary add-btn"
                        onClick={handleAddButtonClick}
                >Add Schedule</button>
                <br/>
            </div>
            {showUpdateForm && selectedArtist && (
                <UpdateSchedule

                    initialValues={selectedArtist}
                    onSubmit={handleUpdateFormClose}
                    onCancel={handleUpdateFormClose}
                />
            )}
            {showAddForm && (
                <AddSchedule
                    onSubmit={handleAddFormClose}
                    onCancel={handleAddFormCancel}
                />
            )}

        </div>
    );
};

export default ScheduleO;
