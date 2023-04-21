import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
// import axios from "axios";
import '../../StyleSheets/updateForm.scss';
import axios from "../../Config/AxiosBase";
import SideNavBar from "../SideNavBar";

interface AttendeeData {
    attendeesID: number;
    attendeeName: string;
    phoneNumber: number;
    password: string;
    email: string;
}

const AttendeeForm = () => {
    const [initialData, setInitialData] = useState<AttendeeData>({
        attendeesID: 0,
        attendeeName: "",
        phoneNumber: 0,
        password: "",
        email: "",
    });

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setInitialData(parsedData);
            formik.setValues(parsedData); // Set form values with data from localStorage
            console.log(parsedData);
        }
    }, []);

    const formik = useFormik({
        initialValues: initialData,
        validationSchema: yup.object({
            attendeeName: yup.string().required("Required"),
            phoneNumber: yup.string().required("Required"),
            password: yup.string().required("Required"),
            email: yup.string().email("Invalid email address").required("Required"),
        }),
        onSubmit: async (values) => {
            console.log("Submitting form");
            console.log(values);
            try {
                const response = await axios.put("/attendee/updateAttendee", {
                    attendeesID: values.attendeesID,
                    attendeeName: values.attendeeName,
                    phoneNumber: values.phoneNumber,
                    password: values.password,
                    email: values.email,
                });
                if (response.status === 200) {
                    localStorage.setItem("userData", JSON.stringify(values));
                    console.log("Data stored in localStorage");
                }
                alert("Attendee data updated")
                console.log("Update successful", response.data);
                console.log(values);
                // navigate('/OrganizerLogin');

            } catch (error) {
                console.error("Update failed", error);
                console.log(values);
            }
        }
    });

    return (
        <div className="update-form">
            <SideNavBar />
            <form onSubmit={formik.handleSubmit} className="form-update">
                <div>
                    <label htmlFor="attendeeName">Attendee Name:</label>
                    <input
                        type="text"
                        id="attendeeName"
                        {...formik.getFieldProps("attendeeName")}
                    />
                    {formik.touched.attendeeName && formik.errors.attendeeName && (
                        <div>{formik.errors.attendeeName}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        {...formik.getFieldProps("phoneNumber")}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                        <div>{formik.errors.phoneNumber}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div>{formik.errors.password}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" {...formik.getFieldProps("email")} />
                    {formik.touched.email && formik.errors.email && (
                        <div>{formik.errors.email}</div>
                    )}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AttendeeForm;
