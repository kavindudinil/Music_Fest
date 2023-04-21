import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../Config/AxiosBase";
// import '../../StyleSheets/organizerStyle/updateArtist.scss'

interface ScheduleDetails {
    date: string;
    time: string;
    artistId: number;
    itemId: number;
    stage: string;
}

interface UpdateArtistProps {
    initialValues: ScheduleDetails;
    onSubmit: (values: ScheduleDetails) => void;
    onCancel: () => void;
}

const UpdateSchedule: React.FC<UpdateArtistProps> = ({
                                                       initialValues,
                                                       onSubmit,
                                                       onCancel
                                                   }) => {
    // const [showUpdateForm, setShowUpdateForm] = useState(false);



    const validationSchema = Yup.object({
        date: Yup.string().required("Required"),
        time: Yup.string().required("Required"),
        stage: Yup.string().required("Required"),
        artistId: Yup.number().required("Required"),
    });


    const handleSubmit = async (values: ScheduleDetails) => {
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
                            <label htmlFor="date">Date</label>
                            <Field
                                type="date"
                                id="date"
                                name="date"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="date"
                                component="div"
                                className="error"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Time</label>
                            <Field
                                type="time"
                                id="time"
                                name="time"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="time"
                                component="div"
                                className="error"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="stage">Stage</label>
                            <Field
                                type="text"
                                id="stage"
                                name="stage"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="stage"
                                component="div"
                                className="error"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="artistId">Artist ID</label>
                            <Field
                                type="number"
                                id="artistId"
                                name="artistId"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="artistId"
                                component="div"
                                className="error"
                            />
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!formik.isValid}
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </Form>

                )}
            </Formik>
        </div>
    );
};

export default UpdateSchedule;
