import axios from '../Config/AxiosBase';

export interface SearchResult {
    id: number;
    name: string;
    genre: string;
    // add more properties here as needed
}

export const search = async (searchTerm: string): Promise<SearchResult[]> => {
    const response = await axios.post('/attendeeSearch/getAttendeeSearch', { searchTerm });
    return response.data;
};
