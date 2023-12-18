import { useParams } from "react-router-dom"
import { getCountryByName } from "../services/countries";
import { useEffect, useState } from "react";
const Country = () => {
    const [country, setCountry] = useState({});
    const { name } = useParams();
    useEffect(() => {
        const getCountry = async () => {
            const country = await getCountryByName(name);
            console.log(country);
            setCountry(country);
        };
        getCountry();
    }, [name]);
    return (
        <section>
            <h3>Country {country.name && country.name.common}</h3>
            <h2>Capital : {country.capital && country.capital[0]}</h2>
            <h3>Languages:</h3>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>- {language}</li>
                ))}
            </ul>
            <img
                src={country.flags.svg}
                alt={country.flags.alt}
            />
        </section>
    );
}; export default Country;