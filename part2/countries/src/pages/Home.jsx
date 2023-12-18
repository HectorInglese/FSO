import PropTypes from 'prop-types';
import CountiesList from '../components/countriesList';
import SearchSection from '../components/SearchSection';
import { useState } from 'react';
const Home = ({ countries }) => {
    const [displayedCountries, setDisplayedCountries] = useState(countries);

    if (!countries || countries.length === 0) {
        return null;
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        if (!value) {
            setDisplayedCountries(countries);
            return;
        }

        const countriesByCommon = filterCountiresByCommonName(value);
        const countriesByOfficial = filterCountriesByOfficialName(value);
        const filteredCountries = Array.from(new Set(countriesByCommon.concat(countriesByOfficial)));

        if (filteredCountries.length <= 0) {
            setDisplayedCountries(countries);
        } else {
            setDisplayedCountries(filteredCountries);
        }
    };
    const filterCountiresByCommonName = (value) => {
        const filteredCountries = countries.filter((country) => {
            return country.name.common.toLowerCase().includes(value.toLowerCase());
        });
        return filteredCountries;
    };
    const filterCountriesByOfficialName = (value) => {
        const filteredCountries = countries.filter((country) => {
            return country.name.official.toLowerCase().includes(value.toLowerCase());
        });
        return filteredCountries;
    }
    return (
        <section
            className='container mx-auto h-full'
        >
            <h1
                className='my-7 text-3xl font-bold text-center uppercase'
            >
                Countries around the world
            </h1>
            <SearchSection handleSearch={handleSearch} />
            <CountiesList countries={displayedCountries} />
        </section>
    );
}; export default Home;

Home.propTypes = {
    countries: PropTypes.array
}