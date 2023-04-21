import React, { useEffect, useState } from "react";
import axios from '../../../Config/AxiosBase';
import "../../../StyleSheets/organizerStyle/artistO.scss";
import UpdateAttendee from "./UpdateAttendee";
import AddAttendeeA from "./AddAttendee";


interface ArtistDetails {
    artistId: number;
    artistName: string;
    artistGenre: string;
    artistDescription: string;
    organizerID: number;
}

interface OrganizerData {
    organizerId: number,
    organizerName: string,
    password: string,
    email: string,
}

interface AttendeeData {
    attendeesID: number,
    attendeeName: string,
    phoneNumber: number,
    password: string,
    email: string,

}

const AttendeeA: React.FC = () => {

    const [Attendee, setAttendee] = useState<Array<AttendeeData>>([]);
    const [initialData, setInitialData] = useState<OrganizerData>({
        organizerId: 0,
        organizerName: "",
        password: "",
        email: "",
    });
    const [selectedAttendee, setSelectedAttendee] = useState<AttendeeData | null>(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState<AttendeeData>({
            attendeesID: 0,
            attendeeName: "",
            phoneNumber: 0,
            password: "",
            email: "",
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

    const fetchTableData = async () => {
        try {
            console.log(initialData.organizerId);
            const response = await axios.get(`/attendee/getAttendee`);
            console.log(response.data.content);
            setAttendee(response.data.content);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    const handleDeleteButtonClick = (rowData: AttendeeData) => {
        axios.delete(`/attendee/deleteAttendee/${rowData.attendeesID}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                const newAttendee = Attendee.filter((attendee) => attendee.attendeesID !== rowData.attendeesID);
                setAttendee(newAttendee);
                alert("Attendee Deleted Successfully")
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
            attendeesID: 0,
            attendeeName: "",
            phoneNumber: 0,
            password: "",
            email: "",
        });
        fetchTableData()
    };
    const handleAddFormCancel = () => {
        setShowAddForm(false);
        setFormData({
            attendeesID: 0,
            attendeeName: "",
            phoneNumber: 0,
            password: "",
            email: "",
        });
    };


    const handleUpdateButtonClick = (rowData: AttendeeData) => {
        setSelectedAttendee(rowData);
        setShowUpdateForm(true);
    }

    const handleUpdateFormClose = () => {
        setShowUpdateForm(false);
        setSelectedAttendee(null);
        fetchTableData()

    }

    return (
        <div className="containerP">
            <h1>Artist</h1>
            <br/>
            <br/>
            <br/>
            <h1 className="headingM">Attendee Details</h1>
            <p className="paraM">Here you can view the Attendee details</p>
            <div className="container container-customN">
                <div className="row row-customN">
                    {Attendee.map((rowData, index) => (
                        <div key={index} className="col-md-4">
                            <div className="card mb-4 card-body-custom">
                                <div className="card-body rounded ">
                                    <h5 className="card-title">Row #{index + 1}</h5>
                                    <p className="card-text">
                                        <strong>Attendee ID: </strong>
                                        {rowData.attendeesID}
                                    </p>
                                    <p className="card-text">
                                        <strong>Name: </strong>
                                        {rowData.attendeeName}
                                    </p>
                                    <p className="card-text">
                                        <strong>Phone Number: </strong>
                                        {rowData.phoneNumber}
                                    </p>
                                    <p className="card-text">
                                        <strong>Password: </strong>
                                        {rowData.password}
                                    </p>
                                    <p className="card-text">
                                        <strong>Email: </strong>
                                        {rowData.email}
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
                >Add Attendee</button>
                <br/>
            </div>
            {showUpdateForm && selectedAttendee && (
                <UpdateAttendee

                    initialValues={selectedAttendee}
                    onSubmit={handleUpdateFormClose}
                    onCancel={handleUpdateFormClose}
                />
            )}
            {showAddForm && (
                <AddAttendeeA
                    onSubmit={handleAddFormClose}
                    onCancel={handleAddFormCancel}
                />
            )}

        </div>
    );
};

export default AttendeeA;
