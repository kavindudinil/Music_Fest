import React, { useState, useEffect } from 'react';
import axios from '../../Config/AxiosBase';
import { Container, Row, Table, Button } from 'react-bootstrap';
import '../../StyleSheets/scheduletable.scss';
import SideNavBar from "../SideNavBar";


interface ScheduleItem {
    itemId: number;
    artistId: number;
    stage: string;
    date: string;
    time: string;
}

interface AttendeeData {
    attendeesID: number;
    attendeeName: string;
    phoneNumber: number;
    password: string;
    email: string;
}

interface AttendeeSchedule {
    attendeeScheduleID: number;
    attendeeID: number;
    scheduleID: number;
}

const ScheduleTable: React.FC = () => {

    const [initialData, setInitialData] = useState<AttendeeData>({
        attendeesID: 0,
        attendeeName: "",
        phoneNumber: 0,
        password: "",
        email: "",
    });

    const [initialAttendeeSchedule, setInitialAttendeeSchedule] = useState<AttendeeSchedule>({
        attendeeScheduleID: 0,
        attendeeID: 0,
        scheduleID: 0,
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

    useEffect(() => {
        const fetchScheduleItems = async () => {
            console.log(initialData.attendeesID);
            try {
                const response = await axios.get('/attendeesSchedule/getAttendeesSchedule');
                console.log(response.data.content);
                setInitialAttendeeSchedule(response.data.content);

                response.data.content.filter((item: AttendeeSchedule) => item.attendeeID === initialData.attendeesID).map((item: AttendeeSchedule) => {
                    console.log(item);
                    setAttendeeSchedule((prevItems) => [...prevItems, item]);
                }
                );
            }
            catch (error) {
                console.error('Failed to fetch schedule items', error);
            }
        };

        fetchScheduleItems();
    }, [initialData.attendeesID]);


    const [scheduleItems, setScheduleItems] = useState<Array<ScheduleItem>>([]);
    const [attendeeSchedule, setAttendeeSchedule] = useState<Array<AttendeeSchedule>>([]);

    useEffect(() => {
        const fetchScheduleItems = async () => {
            try {
                for (let i = 0; i < attendeeSchedule.length; i++) {
                    console.log(attendeeSchedule[i].scheduleID);
                }
                const response = await axios.get('/schedule/getSchedule');
                console.log(response.data.content);
                    for (let i = 0; i < attendeeSchedule.length; i++) {
                        response.data.content.filter((item: ScheduleItem) => item.itemId === attendeeSchedule[i].scheduleID).map((item: ScheduleItem) => {
                            console.log(item);
                            setScheduleItems((prevItems) => [...prevItems, item]);
                        }
                        );
                    }
            } catch (error) {
                console.error('Failed to fetch schedule items', error);
            }
        };

        fetchScheduleItems();
    }, [attendeeSchedule]);

    const handleDelete = async (itemId: number) => {
        try {
            attendeeSchedule.filter((item: AttendeeSchedule) => item.scheduleID === itemId).map((item: AttendeeSchedule) => {
                console.log(item);
                axios.delete(`/attendeesSchedule/deleteAttendeesSchedule/${item.attendeeScheduleID}`)
                    .then(() => {
                        setScheduleItems(prevItems => prevItems.filter((item: ScheduleItem) => item.itemId !== itemId))
                        alert("Deleted successfully")
                    })
            });
        } catch (error) {
            console.error('Failed to delete schedule item', error);
        }
    };


    return (
        <div>
            <SideNavBar />
            <Container className="table-custom">
                <Row>
                    <Table striped bordered hover className="table-p">
                        <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Artist ID</th>
                            <th>Stage</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {scheduleItems.length > 0 ? (
                            scheduleItems.map((scheduleItem) => (
                                <tr key={scheduleItem.itemId}>
                                    <td>{scheduleItem.itemId}</td>
                                    <td>{scheduleItem.artistId}</td>
                                    <td>{scheduleItem.stage}</td>
                                    <td>{scheduleItem.date}</td>
                                    <td>{scheduleItem.time}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleDelete(scheduleItem.itemId)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>No schedule items found</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div>
    );
};

export default ScheduleTable;
