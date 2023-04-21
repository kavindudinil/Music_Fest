import React, {useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../Config/AxiosBase";
import '../../../StyleSheets/organizerStyle/updateArtist.scss'
import {useNavigate} from "react-router-dom";

// export interface OrganizerDataProps {
//     artistName: string;
//     artistGenre: string;
//     artistDescription: string;
//     organizerId: number;
// }
interface OrganizerDataProps {
    organizerId: number,
    organizerName: string,
    password: string,
    email: string,
}

interface AddArtistProps {
    onSubmit: (values: OrganizerDataProps) => void;
    onCancel: () => void;

}

const AddOrganizerA: React.FC<AddArtistProps> = ({
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

    const handleSubmit = async (values: OrganizerDataProps) => {
        try {
            console.log(initialData?.organizerId);
            const response = await axios.post(
                `/organizer/saveOrganizer`,{
                    organizerName: values.organizerName,
                    password: values.password,
                    email: values.email,
                    organizerId: values.organizerId
                }
            );
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
                initialValues={{ organizerName: "", password: "", email: "", organizerId: 0 }}
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
                            <ErrorMessage name="organizerName" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field
                                type="text"
                                id="password"
                                name="password"
                                className="form-control"
                            />
                            <ErrorMessage name="password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field
                                type="text"
                                id="email"
                                name="email"
                                className="form-control"
                            />
                            <ErrorMessage name="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="organizerId">Organizer Id</label>
                            <Field
                                type="text"
                                id="organizerId"
                                name="organizerId"
                                className="form-control"
                            />
                            <ErrorMessage name="organizerId" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
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

export default AddOrganizerA;