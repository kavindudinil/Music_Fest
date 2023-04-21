import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../Config/AxiosBase";
import '../../../StyleSheets/organizerStyle/updateArtist.scss'

interface ArtistDetails {
    artistId: number;
    artistName: string;
    artistGenre: string;
    artistDescription: string;
    organizerID: number;
}

interface UpdateArtistProps {
    initialValues: ArtistDetails;
    onSubmit: (values: ArtistDetails) => void;
    onCancel: () => void;
}

const UpdateArtist: React.FC<UpdateArtistProps> = ({
                                                       initialValues,
                                                       onSubmit,
                                                         onCancel
                                                   }) => {
    // const [showUpdateForm, setShowUpdateForm] = useState(false);



    const validationSchema = Yup.object({
        artistName: Yup.string().required("Required"),
        artistGenre: Yup.string().required("Required"),
        artistDescription: Yup.string().required("Required"),
    });


    const handleSubmit = async (values: ArtistDetails) => {
        try {
            const response = await axios.put(
                `/artists/updateArtist`,
                values
            );
            alert("Artist data updated")
            console.log(response.data);
            onSubmit(values);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        onCancel();
    }

    return (
        <div className="container">
            <Formik
                initialValues={initialValues}
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
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            {formik.isSubmitting ? "Updating..." : "Update"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleCancel()}
                        >
                            Cancel
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateArtist;
