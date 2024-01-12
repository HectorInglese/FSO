import PropTypes from 'prop-types';

const PersonsGrid = ({ handlePersonsFilter, handlePersonDelete }) => {
    const filter = handlePersonsFilter();

    if (filter === undefined || filter.length === 0) {
        return (
            <p>No persons in the phonebook</p>
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan="3">Numbers</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Actions</th>
                </tr>
                {filter.map((person) => (
                    <tr key={person.id}>
                        <td>{person.name}</td>
                        <td>{person.number}</td>
                        <td>
                            <button onClick={() => handlePersonDelete(person.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default PersonsGrid;
PersonsGrid.propTypes = {
    handlePersonsFilter: PropTypes.func.isRequired,
    handlePersonDelete: PropTypes.func.isRequired
};