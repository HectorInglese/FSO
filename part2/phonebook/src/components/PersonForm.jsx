import PropTypes from 'prop-types';

const PersonForm = (props) => {
    return (
        <>
            <h3>Add a new</h3>
            <form onSubmit={props.handleSubmit}>
                <div>
                    name: <input
                        required
                        value={props.newName || ''}
                        onChange={props.handleNameChange}
                    />
                    <br />
                    phone:
                    <input
                        required
                        value={props.newNumber || ''}
                        onChange={props.handleNumberChange}
                        type='tel'
                    />
                </div>
                <br />
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    );
};
export default PersonForm;
PersonForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    newName: PropTypes.string,
    newNumber: PropTypes.string,
    handleNameChange: PropTypes.func.isRequired,
    handleNumberChange: PropTypes.func.isRequired
};