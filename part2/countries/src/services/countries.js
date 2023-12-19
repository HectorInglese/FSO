import axios from "axios";

const apiKey = import.meta.env.VITE_MY_VARIABLE;
const baseUrl = import.meta.env.VITE_COUNTRIES_BASE_URL;
const weatherBaseURL = import.meta.env.VITE_WEATHER_BASE_URL;

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

const getWeather = async (latlng) => {
    const weatherURL = `${weatherBaseURL}?units=metric&lat=${latlng[0]}&lon=${latlng[1]}&appid=${apiKey}`;
    try {
        const response = await axios.get(weatherURL);
        return (response.data);
    } catch (error) {
        console.log(error);
    }
};
export {
    getAllCountries,
    getCountryByName,
    getWeather
};