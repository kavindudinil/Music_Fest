import React, {useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../Config/AxiosBase";
import '../../../StyleSheets/organizerStyle/updateArtist.scss'
import {useNavigate} from "react-router-dom";

// export interface AttendeeDataProps {
//     artistName: string;
//     artistGenre: string;
//     artistDescription: string;
//     organizerId: number;
// }
interface AttendeeDataProps {
    attendeeID: number,
    attendeeName: string,
    phoneNumber: number,
    password: string,
    email: string,

}
interface OrganizerDataProps {
    organizerId: number,
    organizerName: string,
    password: string,
    email: string,

}

interface AddAttendeeProps {
    onSubmit: (values: AttendeeDataProps) => void;
    onCancel: () => void;

}

const AddAttendeeA: React.FC<AddAttendeeProps> = ({
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
        organizerName: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
    });

    const handleSubmit = async (values: AttendeeDataProps) => {
        try {
            console.log(initialData?.organizerId);
            const response = await axios.post(
                `/attendee/addAttendee`,{
                    attendeeName: values.attendeeName,
                    phoneNumber: values.phoneNumber,
                    password: values.password,
                    email: values.email,
                    // attendeeID: values.attendeeID
                }
            );
            console.log(response.data);
            onSubmit(values);
            alert("Attendee Added Successfully");
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
                initialValues={{ attendeeName: "", phoneNumber: 0, password: "", email: "", attendeeID: 0 }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Form className="formP">
                        <div className="form-group">
                            <label htmlFor="attendeeName">Attendee Name</label>
                            <Field
                                type="text"
                                id="attendeeName"
                                name="attendeeName"
                                className="form-control"
                            />
                            <ErrorMessage name="attendeeName" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <Field
                                type="number"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="form-control"
                            />
                            <ErrorMessage name="phoneNumber" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                            />
                            <ErrorMessage name="password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                            />
                            <ErrorMessage name="email" />
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

export default AddAttendeeA;