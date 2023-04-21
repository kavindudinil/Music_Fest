import React, { useEffect, useState } from "react";
import axios from '../../../Config/AxiosBase';
import "../../../StyleSheets/organizerStyle/artistO.scss";
import UpdateOrganizer from "./UpdateOrganizer";
import AddOrganizerA from "./AddOrganizer";


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

const OrganizerA: React.FC = () => {

    const [organizer, setOrganizer] = useState<Array<OrganizerData>>([]);
    const [initialData, setInitialData] = useState<OrganizerData>({
        organizerId: 0,
        organizerName: "",
        password: "",
        email: "",
    });
    const [selectedOrganizer, setSelectedOrganizer] = useState<OrganizerData | null>(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState<OrganizerData>({
            organizerId: 0,
            organizerName: "",
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
            const response = await axios.get(`/organizer/getOrganizer`);
            console.log(response.data.content);
            setOrganizer(response.data.content);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    const handleDeleteButtonClick = (rowData: OrganizerData) => {
        axios.delete(`/organizer/deleteOrganizer/${rowData.organizerId}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                const newArtist = organizer.filter((artist) => artist.organizerId !== rowData.organizerId);
                setOrganizer(newArtist);
                alert("Organizer Deleted Successfully")
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
            organizerId: 0,
            organizerName: "",
            password: "",
            email: "",
        });
        fetchTableData()
    };
    const handleAddFormCancel = () => {
        setShowAddForm(false);
        setFormData({
            organizerId: 0,
            organizerName: "",
            password: "",
            email: "",
        });
    };


    const handleUpdateButtonClick = (rowData: OrganizerData) => {
        setSelectedOrganizer(rowData);
        setShowUpdateForm(true);
    }

    const handleUpdateFormClose = () => {
        setShowUpdateForm(false);
        setSelectedOrganizer(null);
        fetchTableData()
    }

    return (
        <div className="containerP">
            <h1>Artist</h1>
            <br/>
            <br/>
            <br/>
            <h1 className="headingM">Organizer Details</h1>
            <p className="paraM">Here you can view the Organizer details</p>
            <div className="container container-customN">
                <div className="row row-customN">
                    {organizer.map((rowData, index) => (
                        <div key={index} className="col-md-4">
                            <div className="card mb-4 card-body-custom">
                                <div className="card-body rounded ">
                                    <h5 className="card-title">Row #{index + 1}</h5>
                                    <p className="card-text">
                                        <strong>Name: </strong>
                                        {rowData.organizerId}
                                    </p>
                                    <p className="card-text">
                                        <strong>Genre: </strong>
                                        {rowData.organizerName}
                                    </p>
                                    <p className="card-text">
                                        <strong>Description: </strong>
                                        {rowData.password}
                                    </p>
                                    <p className="card-text">
                                        <strong>ArtistId: </strong>
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
                >Add Organizer</button>
                <br/>
            </div>
            {showUpdateForm && selectedOrganizer && (
                <UpdateOrganizer

                    initialValues={selectedOrganizer}
                    onSubmit={handleUpdateFormClose}
                    onCancel={handleUpdateFormClose}
                />
            )}
            {showAddForm && (
                <AddOrganizerA
                    onSubmit={handleAddFormClose}
                    onCancel={handleAddFormCancel}
                />
            )}

        </div>
    );
};

export default OrganizerA;
