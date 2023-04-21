import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../Config/AxiosBase";
import '../../../StyleSheets/organizerStyle/updateArtist.scss'

interface OrganizerProps {
    organizerId: number,
    organizerName: string,
    password: string,
    email: string,
}

interface UpdateOrganizerProps {
    initialValues: OrganizerProps;
    onSubmit: (values: OrganizerProps) => void;
    onCancel: () => void;
}

const UpdateOrganizer: React.FC<UpdateOrganizerProps> = ({
                                                         initialValues,
                                                         onSubmit,
                                                         onCancel
                                                     }) => {
    // const [showUpdateForm, setShowUpdateForm] = useState(false);



    const validationSchema = Yup.object({
        organizerName: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
    });


    const handleSubmit = async (values: OrganizerProps) => {
        try {
            const response = await axios.put(
                `/organizer/updateOrganizer`,
                values
            );
            console.log(response.data);
            onSubmit(values);
            alert("Organizer data updated")
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
                            <label htmlFor="organizerName">Organizer Name</label>
                            <Field
                                type="text"
                                id="organizerName"
                                name="organizerName"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="organizerName"
                                component="div"
                                className="text-danger"
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
                                className="text-danger"
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
                                className="text-danger"
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

export default UpdateOrganizer;
