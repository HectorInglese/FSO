import PropTypes from 'prop-types';

const PersonsGrid = ({ handlePersonsFilter }) => {
    return (
        <table>
            <th colSpan="2">Numbers</th>
            <tr>
                <th>Name</th>
                <th>Number</th>
            </tr>
            {handlePersonsFilter().map((person) => (
                <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>{person.number}</td>
                </tr>
            ))}
        </table>
    );
};
export default PersonsGrid;
PersonsGrid.propTypes = { handlePersonsFilter: PropTypes.func.isRequired, };