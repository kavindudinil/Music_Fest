import React, {useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../Config/AxiosBase";
// import '../../StyleSheets/organizerStyle/updateArtist.scss'
import {useNavigate} from "react-router-dom";

export interface ScheduleProps {
    date: string;
    time: string;
    artistId: number;
    itemId: number;
    stage: number;
}
interface OrganizerDataProps {
    organizerId: number,
    organizerName: string,
    password: string,
    email: string,
}

interface AddArtistProps {
    onSubmit: (values: ScheduleProps) => void;
    onCancel: () => void;

}

const AddSchedule: React.FC<AddArtistProps> = ({
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
        date: Yup.string().required("Required"),
        time: Yup.string().required("Required"),
        artistId: Yup.number().required("Required"),
        stage: Yup.string().required("Required"),
    });

    const handleSubmit = async (values: ScheduleProps) => {
        try {
            console.log(initialData?.organizerId);
            const response = await axios.post(
                `/schedule/saveSchedule`,{
                    date: values.date,
                    time: values.time,
                    artistId: values.artistId,
                    stage: values.stage
                }
            );
            alert("Schedule Added Successfully")
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
                initialValues={{ date: "", time: "", artistId: 0, stage:0, itemId: 0 }}
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
                            <ErrorMessage name="date" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Time</label>
                            <Field
                                type="time"
                                id="time"
                                // value={formik.values.time}
                                name="time"
                                className="form-control"
                            />
                            <ErrorMessage name="time" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="artistId">Artist Id</label>
                            <Field
                                type="number"
                                id="artistId"
                                name="artistId"
                                className="form-control"
                            />
                            <ErrorMessage name="artistId" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="stage">Stage</label>
                            <Field
                                type="text"
                                id="stage"
                                name="stage"
                                className="form-control"
                            />
                            <ErrorMessage name="stage" />
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!formik.isValid}
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
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

export default AddSchedule;