import React, { useEffect, useState } from "react";
import axios from '../../../Config/AxiosBase';
import "../../../StyleSheets/organizerStyle/artistO.scss"
import UpdateArtist from "./UpdateArtistForm";
import AddArtist from "./AddArtist";

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

const ArtistO: React.FC = () => {

    const [artist, setArtist] = useState<Array<ArtistDetails>>([]);
    const [initialData, setInitialData] = useState<OrganizerData>({
        organizerId: 0,
        organizerName: "",
        password: "",
        email: "",
    });
    const [selectedArtist, setSelectedArtist] = useState<ArtistDetails | null>(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState<ArtistDetails>({
        artistId: 0,
        artistName: "",
        artistGenre: "",
        artistDescription: "",
        organizerID: initialData.organizerId,
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
            // console.log(initialData.organizerId);
            const response = await axios.get(`/artists/getOrganizerId/${initialData.organizerId}`);
            // console.log(response.data.content);
            setArtist(response.data.content);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, [fetchTableData]);

    const handleDeleteButtonClick = (rowData: ArtistDetails) => {
        axios.delete(`/artists/deleteArtist/${rowData.artistId}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setArtist(artist.filter(artist => artist.artistId !== rowData.artistId));
                alert("Artist Deleted Successfully")
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
            artistId: 0,
            artistName: "",
            artistGenre: "",
            artistDescription: "",
            organizerID: initialData.organizerId,
        });
        fetchTableData();
    };
    const handleAddFormCancel = () => {
        setShowAddForm(false);
        setFormData({
            artistId: 0,
            artistName: "",
            artistGenre: "",
            artistDescription: "",
            organizerID: initialData.organizerId,
        });
    };


    const handleUpdateButtonClick = (rowData: ArtistDetails) => {
        setSelectedArtist(rowData);
        setShowUpdateForm(true);
    }

    const handleUpdateFormClose = () => {
        setShowUpdateForm(false);
        setSelectedArtist(null);
        fetchTableData();

    }

    return (
        <div className="containerP">
            <h1>Artist</h1>
            <br/>
            <br/>
            <br/>
            <h1 className="headingM">Artist Details</h1>
            <p className="paraM">Here you can view the Artist details</p>
            <div className="container container-customN">
                <div className="row row-customN">
                    {artist.map((rowData, index) => (
                        <div key={index} className="col-md-4">
                            <div className="card mb-4 card-body-custom">
                                <div className="card-body rounded ">
                                    <h5 className="card-title">Row #{index + 1}</h5>
                                    <p className="card-text">
                                        <strong>Name: </strong>
                                        {rowData.artistName}
                                    </p>
                                    <p className="card-text">
                                        <strong>Genre: </strong>
                                        {rowData.artistGenre}
                                    </p>
                                    <p className="card-text">
                                        <strong>Description: </strong>
                                        {rowData.artistDescription}
                                    </p>
                                    <p className="card-text">
                                        <strong>ArtistId: </strong>
                                        {rowData.artistId}
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
                >Add Artist</button>
                <br/>
            </div>
            {showUpdateForm && selectedArtist && (
                <UpdateArtist

                 initialValues={selectedArtist}
                 onSubmit={handleUpdateFormClose}
                 onCancel={handleUpdateFormClose}
                />
            )}
            {showAddForm && (
                <AddArtist
                    onSubmit={handleAddFormClose}
                    onCancel={handleAddFormCancel}
                    />
            )}

        </div>
    );
};

export default ArtistO;
