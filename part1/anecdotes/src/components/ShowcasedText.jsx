import PropTypes from 'prop-types';
const ShowcasedText = ({ text }) => {
    return (
        <p>{text}</p>
    );
};

ShowcasedText.propTypes = {
    text: PropTypes.string.isRequired
};
export default ShowcasedText;