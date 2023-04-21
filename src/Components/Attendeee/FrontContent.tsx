import React, { useEffect, useState } from 'react';
import axios from '../../Config/AxiosBase';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../StyleSheets/frontOrganizer.scss'

interface TableRowData {
    date: string;
    time: string;
    artistId: number;
    stage: number;
    itemId: number;
}
interface AttendeeData {
    attendeesID: number;
    attendeeName: string;
    phoneNumber: number;
    password: string;
    email: string;
}

const MyComponent = () => {

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
            console.log("Buuuu")
            console.log(parsedData);
        }
    }, []);
    const [tableData, setTableData] = useState<TableRowData[]>([]);

    const fetchTableData = async () => {
        try {
            const response = await axios.get('/schedule/getSchedule'); // replace with your API endpoint
            setTableData(response.data.content);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, []);


    const handleRowButtonClick = async (rowData: TableRowData) => {
        console.log(rowData);
        try {
            const response = await axios.post('/attendeesSchedule/saveAttendeesSchedule', {
                attendeeID: initialData.attendeesID,
                scheduleID: rowData.itemId
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        alert("Added to schedule")
    }

    return (
        <div className="container container-custom">
            <div className="row row-custom">
                {tableData.map((rowData, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card mb-4 card-body-custom">
                            <div className="card-body rounded ">
                                <h5 className="card-title">Row #{index + 1}</h5>
                                <p className="card-text">
                                    <strong>Date: </strong>
                                    {rowData.date}
                                </p>
                                <p className="card-text">
                                    <strong>Time: </strong>
                                    {rowData.time}
                                </p>
                                <p className="card-text">
                                    <strong>Artist ID: </strong>
                                    {rowData.artistId}
                                </p>
                                <p className="card-text">
                                    <strong>Stage: </strong>
                                    {rowData.stage}
                                </p>
                                <p className="card-text">
                                    <strong>Item ID: </strong>
                                    {rowData.itemId}
                                </p>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleRowButtonClick(rowData)}
                                >
                                    Add to schedule
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyComponent;
