import { useParams } from "react-router-dom"
import { getCountryByName } from "../services/countries";
import { useEffect, useState } from "react";
const Country = () => {
    const [country, setCountry] = useState({});
    const { name } = useParams();

    const getCountry = async () => {
        const country = await getCountryByName(name);
        setCountry(country);
    };
    useEffect(() => {
        getCountry();
    }, []);
    return (
        <div>Country {country.name && country.name.common}</div>
    );
}; export default Country;