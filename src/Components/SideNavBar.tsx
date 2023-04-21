import React, {useEffect, useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../Config/AxiosBase';
import '../StyleSheets/sidebar.scss';

interface Artist {
    artistId: number;
    artistName: string;
    artistGenre: string;
    artistDescription: string;
    password: string;
    email: string;
    // add more properties as needed
}

interface SearchRequest {
    name?: string;
    genre?: string;
}

const SideNavBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [artists, setArtists] = useState<Artist[]>([]);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const searchResultsRef = useRef<HTMLDivElement>(null);

    const handleSearch = async () => {
        try {
            const searchRequest: SearchRequest = {};
            if (searchTerm) {
                // Check if search term is either artist name or genre
                if (searchTerm.toLowerCase() === 'rock' || searchTerm.toLowerCase() === 'pop' || searchTerm.toLowerCase() === 'country' || searchTerm.toLowerCase() === 'jazz') {
                    searchRequest.genre = searchTerm;
                } else {
                    searchRequest.name = searchTerm;
                }
            }

            const response = await axios.post<{ content: Artist[] }>('/attendeeSearch/getAttendeeSearch', searchRequest);
            setArtists(response.data.content);
            console.log(response.data.content);
        } catch (error) {
            console.error('Failed to fetch artists', error);
            // Display an error message to the user
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSearch();
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
                setArtists([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="toggle-button" onClick={toggleVisibility}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className={`sidebar-container${isVisible ? '' : ' hidden'}`}>
                <div className="search-form">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Search by Artist Name or Genre" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                        </Form.Group>
                        <Button type="submit">Search</Button>
                    </Form>
                </div>
                <div className="sidebar-links">
                    <ListGroup>
                        <ListGroup.Item action as={Link} to="/organizerMain">Attendee Home</ListGroup.Item>
                        <ListGroup.Item action as={Link} to="/scheduleTable">Schedule</ListGroup.Item>
                        <ListGroup.Item action as={Link} to="/updateProfile">Edit Attendee Details</ListGroup.Item>
                    </ListGroup>
                </div>
                {artists.length > 0 && (
                    <div className="sidebar-search-results" ref={searchResultsRef}>
                        <h5>Search Results</h5>
                        <ListGroup>
                            {artists.map((artist) => (
                                <ListGroup.Item key={artist.artistId} action as={Link} to={`/artist/${artist.artistId}`}>
                                    {artist.artistName}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                )}
            </div>
        </>
    );
};

export default SideNavBar;
