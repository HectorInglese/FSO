import PropTypes from 'prop-types';
const SearchSection = ({ handleSearch }) => {
  return (
    <section>
      <h2>Search Country</h2>
      <input
        type="text"
        placeholder="Write your country..."
        className="border-2 border-gray-400 rounded-md p-2 my-1"
        onChange={(e) => handleSearch(e)}
      />
    </section>
  );
}; export default SearchSection; SearchSection.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};