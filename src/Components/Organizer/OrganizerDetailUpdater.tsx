import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../Config/AxiosBase";
import '../../StyleSheets/organizerStyle/updateOrganizer.scss'

interface OrganizerData {
    organizerId: number,
    organizerName: string,
    password : string,
    email : string,
}

interface UpdateArtistProps {
    initialValues: OrganizerData;
    onSubmit: (values: OrganizerData) => void;
    onCancel: () => void;
}

const UpdateOrganizer: React.FC<UpdateArtistProps> = ({
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


    const handleSubmit = async (values: OrganizerData) => {
        try {
            const response = await axios.put(
                `/organizer/updateOrganizer`,
                values
            );
            if (response.status === 200) {
                localStorage.setItem("organizerData", JSON.stringify(response.data.content));
                console.log("Attendeee data updated");
            }
            alert("Organizer data updated")
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
        <div className="container container-customP">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Form className="formH">
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
                                className="btn btn-primary mr-2"
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

export default UpdateOrganizer;
