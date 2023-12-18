import { useParams } from "react-router-dom"
import { getCountryByName, getWeather } from "../services/countries";
import { useEffect, useState } from "react";
const Country = () => {
    const [country, setCountry] = useState({});
    const { name } = useParams();
    useEffect(() => {
        const getCountry = async () => {
            const newCountry = await getCountryByName(name);
            setCountry(newCountry);
        };
        getCountry();
    }, [name]);
    useEffect(() => {
        const getCountryWeather = async () => {
            const countryWeather = await getWeather(country.latlng)
            console.log(countryWeather);
        };
        if (country !== undefined && Object.keys(country).length > 0) {
            getCountryWeather();
        }
    }, [country])
    return (
        <>
            {
                (country !== undefined && Object.keys(country).length > 0)
                    ? (
                        <section>
                            <h3>Country {country.name.common}</h3>
                            <h2>Capital : {country.capital[0]}</h2>
                            <h3>Languages:</h3>
                            <ul>
                                {country.languages && Object.values(country.languages).map((language) => (
                                    <li key={language}>- {language}</li>
                                ))}
                            </ul>
                            <img
                                src={country.flags.svg}
                                alt={country.flags.alt}
                            />
                        </section>
                    )
                    : <h2>Loading...</h2>
            }
        </>
    );
}; export default Country;