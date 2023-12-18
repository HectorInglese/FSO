import PropTypes from 'prop-types';
import LinkButton from './LinkButton';

const CountriesLists = ({ countries }) => {
    return (
        <ul
            className='my-4 grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-4'
        >
            {countries.map((country) => (
                <li
                    key={country.name.official}
                    className='w-full h-full p-5 text-md max-h-[300px]'
                >
                    <div
                        className='w-full h-full shadow-md p-5 gap-5 text-md max-h-[300px] flex justify-between items-center rounded-lg border-solid border-2'
                    >
                        <div
                            className='w-full h-full flex flex-col justify-evenly items-center gap-7 '
                        >
                            <p
                                className='font-bold'
                            >{country.name.common}</p>
                            <LinkButton
                                name={country.name.common}
                            />
                        </div>
                        <img
                            src={country.flags.svg}
                            alt={country.flags.alt}
                            className='object-fit w-[150px] h-full shadow-md'
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
};
export default CountriesLists;
CountriesLists.propTypes = { countries: PropTypes.array };