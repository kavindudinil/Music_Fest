import React, {useState, useEffect, useContext} from 'react';
import axios from '../../Config/AxiosBase';
import "../../StyleSheets/loginO.scss";
import { useNavigate } from "react-router-dom";


// import ScheduleTable from "./viewSchedule";
// import SideNavBar from "../sideNavBar";


export interface ResponseData {
    code: number;
    message: string;
    content: {
        organizerId: number,
        organizerName: string,
        password : string,
        email : string,
    }[];
}

const LoginPageAdministrtor = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [data, setData] = useState<ResponseData | null>(null);
    const [valid, setValid] = useState(false);


    useEffect(() => {
        axios.get('/organizer/getOrganizer')
            .then(response => {
                setData(response.data);
                console.log(response.data);
                alert("Success");
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!username || !password) {
            setError("Please enter a username and password.");
            return;
        }

        const isValid = data && data.content.find(item => item.organizerName === username && item.organizerId === parseInt(password));

        if (isValid) {
            const { organizerName, organizerId, email, password } = isValid;
            const user = { organizerName, organizerId , email, password }
            localStorage.setItem('AdministratorData', JSON.stringify(user));

            console.log(user); // this will log the values
            setError('Pass')
            setValid(true);
            navigate('/adminListA');

            // Handle successful login
        } else {
            setError("Incorrect username or password.");
            setValid(false);
        }
    };
    const handleSignIn = () => {
        navigate('/signIn');
    }


    return (
        <div className="login-page">
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        className={`form-control ${error ? 'is-invalid' : ''} ${valid ? 'is-valid' : ''}`}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        className={`form-control ${error ? 'is-invalid' : ''} ${valid ? 'is-valid' : ''}`}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
                <div className="button-container">
                    <button type="submit">Login</button>
                    <button type="button" onClick={handleSignIn}>Sign In</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPageAdministrtor;

