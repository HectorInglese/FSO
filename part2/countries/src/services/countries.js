import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = async () => {
    try {
        const response = await axios.get(`${baseUrl}/all`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const getCountryByName = async (name) => {
    try {
        const response = await axios.get(`${baseUrl}/name/${name}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export {
    getAllCountries,
    getCountryByName
};