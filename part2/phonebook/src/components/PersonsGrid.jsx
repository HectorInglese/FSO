import PropTypes from 'prop-types';

const PersonsGrid = ({ handlePersonsFilter, handlePersonDelete }) => {
    return (
        <table>
            <th colSpan="3">Numbers</th>
            <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Actions</th>
            </tr>
            {handlePersonsFilter().map((person) => (
                <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>{person.number}</td>
                    <td>
                        <button onClick={() => handlePersonDelete(person.id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </table>
    );
};
export default PersonsGrid;
PersonsGrid.propTypes = { handlePersonsFilter: PropTypes.func.isRequired, handlePersonDelete: PropTypes.func.isRequired };