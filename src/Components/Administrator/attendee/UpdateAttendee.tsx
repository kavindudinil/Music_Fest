import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../Config/AxiosBase";
import '../../../StyleSheets/organizerStyle/updateArtist.scss'

interface AttendeeProps {
    attendeesID: number,
    attendeeName: string,
    phoneNumber: number,
    password: string,
    email: string,

}

interface UpdateAttendeeProps {
    initialValues: AttendeeProps;
    onSubmit: (values: AttendeeProps) => void;
    onCancel: () => void;
}

const UpdateAttendee: React.FC<UpdateAttendeeProps> = ({
                                                             initialValues,
                                                             onSubmit,
                                                             onCancel
                                                         }) => {
    // const [showUpdateForm, setShowUpdateForm] = useState(false);



    const validationSchema = Yup.object({
        attendeeName: Yup.string().required("Required"),
        phoneNumber: Yup.number().required("Required"),
        password: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
    });


    const handleSubmit = async (values: AttendeeProps) => {
        try {
            const response = await axios.put(
                `/attendee/updateAttendee`,
                values
            );
            console.log(response.data);
            onSubmit(values);
            alert("Attendee data updated")
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
                            <label htmlFor="attendeeName">Attendee Name</label>
                            <Field
                                type="text"
                                id="attendeeName"
                                name="attendeeName"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="attendeeName"
                                component="div"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <Field
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="phoneNumber"
                                component="div"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field
                                type="text"
                                id="password"
                                name="password"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field
                                type="text"
                                id="email"
                                name="email"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary mr-2"
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

export default UpdateAttendee;
