import PropTypes from 'prop-types';
const SearchSection = ({ handleSearch }) => {
  return (
    <section
      className="flex gap-2 items-center justify-center w-full h-[11vh]"
    >
      <h2>Search Country</h2>
      <input
        type="text"
        placeholder="Write your country..."
        className="border-2 border-gray-300 rounded-md p-2 my-1 w-[400px]"
        onChange={(e) => handleSearch(e)}
      />
    </section>
  );
}; export default SearchSection; SearchSection.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};