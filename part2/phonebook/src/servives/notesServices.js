import axios from "axios";
const baseUrl = '/api';
export const getPersons = async () => {
    const response = await axios.get(`${baseUrl}/persons`);
    return response.data;
};
export const postPerson = async (person) => {
    const response = await axios.post(`${baseUrl}/persons`, person);
    return response.data;
};
export const deletePerson = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/persons/${id}`);
        return response.data;
    } catch (error) {
        return (error.response);
    }
};
export const updatePerson = async (person) => {
    try {
        const response = await axios.put(`${baseUrl}/persons/${person.id}`, person);
        return response.data;
    } catch (error) {
        return (error.response);
    }
};