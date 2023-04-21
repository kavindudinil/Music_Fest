import React, {useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../Config/AxiosBase";
import '../../../StyleSheets/organizerStyle/updateArtist.scss'
import {useNavigate} from "react-router-dom";

export interface ArtistDetailsProps {
    artistName: string;
    artistGenre: string;
    artistDescription: string;
    organizerId: number;
}
interface OrganizerDataProps {
    organizerId: number,
    organizerName: string,
    password: string,
    email: string,
}

interface AddArtistProps {
    onSubmit: (values: ArtistDetailsProps) => void;
    onCancel: () => void;

}

const AddArtist: React.FC<AddArtistProps> = ({
                                                 onSubmit,
                                                 onCancel
                                             }) => {

    const navigate = useNavigate();

    const [initialData, setInitialData] = useState<OrganizerDataProps>();

    useEffect(() => {
        const storedData = localStorage.getItem("organizerData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setInitialData(parsedData);
            console.log(parsedData);
        }
        console.log(initialData?.organizerId);
    }, [initialData?.organizerId]);
    const validationSchema = Yup.object({
        artistName: Yup.string().required("Required"),
        artistGenre: Yup.string().required("Required"),
        artistDescription: Yup.string().required("Required"),
    });

    const handleSubmit = async (values: ArtistDetailsProps) => {
        try {
            console.log(initialData?.organizerId);
            const response = await axios.post(
                `/artists/saveArtist`,{
                    artistName: values.artistName,
                    artistGenre: values.artistGenre,
                    artistDescription: values.artistDescription,
                    organizerId: initialData?.organizerId
                }
            );
            alert("Artist added successfully")
            console.log(response.data);
            onSubmit(values);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        onCancel();
        // navigate("/organizer/artist");
    }

    return (
        <div className="container">
            <Formik
                initialValues={{ artistName: "", artistGenre: "", artistDescription: "", organizerId: 0 }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Form className="formP">
                        <div className="form-group">
                            <label htmlFor="artistName">Name:</label>
                            <Field
                                type="text"
                                id="artistName"
                                name="artistName"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="artistName"
                                component="div"
                                className="text-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="artistGenre">Genre:</label>
                            <Field
                                type="text"
                                id="artistGenre"
                                name="artistGenre"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="artistGenre"
                                component="div"
                                className="text-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="artistDescription">Description:</label>
                            <Field
                                as="textarea"
                                id="artistDescription"
                                name="artistDescription"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="artistDescription"
                                component="div"
                                className="text-danger"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!formik.isValid}
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddArtist;