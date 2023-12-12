import axios from "axios";
const baseUrl = 'http://localhost:3001';
export const getPersons = async () => {
    const response = await axios.get(`${baseUrl}/persons`);
    return response.data;
};
export const postPerson = async (person) => {
    const response = await axios.post(`${baseUrl}/persons`, person);
    console.log(response);
    return response.data;
};
export const deletePerson = async (id) => {
    const response = await axios.delete(`${baseUrl}/persons/${id}`);
    return response.data;
};
