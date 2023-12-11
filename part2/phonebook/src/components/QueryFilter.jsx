import PropTypes from 'prop-types';

const QueryFilter = ({ handleFilterChange }) => {
    return (
        <>
            filter shown with name : 
            <input
                onChange={(event) => handleFilterChange(event)}
            />
        </>
    );
}; export default QueryFilter; QueryFilter.propTypes = { handleFilterChange: PropTypes.func.isRequired, };