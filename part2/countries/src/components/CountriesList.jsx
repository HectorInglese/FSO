import PropTypes from 'prop-types';

const CountriesLists = ({ countries }) => {
    return (
        <ul
            className='my-4 grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-4'
        >
            {countries.map((country) => (
                <li
                    key={country.name.official}
                    className='w-full h-full hover:drop-shadow-2xl p-5 text-md max-h-[300px] flex justify-between items-center gap-4 rounded-lg border-solid border-2 '
                >
                    {country.name.common}
                    <img
                        src={country.flags.svg}
                        alt={country.flags.alt}
                        className='object-fit w-[150px] h-full'
                    />
                </li>
            ))}
        </ul>
    );
};
export default CountriesLists;
CountriesLists.propTypes = { countries: PropTypes.array };