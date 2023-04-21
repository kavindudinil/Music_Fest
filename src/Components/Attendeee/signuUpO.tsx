import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../Config/AxiosBase";
import "../../StyleSheets/signInO.scss";
import { useNavigate } from "react-router-dom";

export interface SignupFormValuesProps {
    attendeeName: string;
    phoneNumber: string;
    password: string;
    email: string;
    reEnterPassword: string;
}

const SignupSchema = Yup.object().shape({
    attendeeName: Yup.string().required("Name is required"),
    phoneNumber: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    reEnterPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please re-enter your password"),
});

const SignupForm: React.FC = () => {
    const navigate = useNavigate();

    const initialValues: SignupFormValuesProps = {
        attendeeName: "",
        phoneNumber: "",
        password: "",
        email: "",
        reEnterPassword: "",
    };

    const handleSubmit = async (values: SignupFormValuesProps) => {
        console.log("Submitting form");
        try {
            const response = await axios.post(
                "/attendee/addAttendee",
                {
                    attendeeName: values.attendeeName,
                    phoneNumber: values.phoneNumber,
                    password: values.password,
                    email: values.email,
                }
            );
            console.log("Signup successful", response.data);
            console.log(values);
            navigate("/OrganizerLogin");
        } catch (error) {
            console.error("Signup failed", error);
            console.log(values);
        }
    };

    return (
        <div className="formN">
            <div className="form-container">
                <Formik
                    initialValues={initialValues}
                    validationSchema={SignupSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="form-field">
                            <label htmlFor="attendeeName">Name</label>
                            <Field
                                id="attendeeName"
                                name="attendeeName"
                                type="name"
                                placeholder="Enter your name"
                                className={
                                    errors.attendeeName && touched.attendeeName ? "error" : touched.attendeeName ? "success" : ""
                                }
                            />
                            <div className="error-happen">
                                <ErrorMessage name="attendeeName" className="error-happen" />
                            </div>

                            <label htmlFor="phoneNumber">Phone number</label>
                            <Field
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                placeholder="Enter your phone number"
                                className={
                                    errors.phoneNumber && touched.phoneNumber ? "error" : touched.phoneNumber ? "success" : ""
                                }
                            />
                            <div className="error-happen">
                                <ErrorMessage name="phoneNumber" className="error-happen" />
                            </div>

                            <label htmlFor="email">Email</label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className={errors.email && touched.email ? "error" : touched.email ? "success" : ""}
                            />
                            <div className="error-happen">
                                <ErrorMessage name="email" className="error-happen" />
                            </div>

                            <label htmlFor="password">Password</label>
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                className={errors.password && touched.password ? "error" : touched.password ? "success" : ""}
                            />
                            <div className="error-happen">
                                <ErrorMessage name="password" className="error-happen" />
                            </div>

                            <label htmlFor="reEnterPassword">Re-enter password</label>
                            <Field
                                id="reEnterPassword"
                                name="reEnterPassword"
                                type="password"
                                placeholder="Re-enter your password"
                                className={
                                    errors.reEnterPassword && touched.reEnterPassword ? "error" : touched.reEnterPassword ? "success" : "" }
                            />
                            <div className="error-happen">
                                <ErrorMessage name="reEnterPassword" className="error-happen" />
                            </div>

                            <button type="submit">Sign up</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SignupForm;