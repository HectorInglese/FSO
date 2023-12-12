import PropTypes from 'prop-types';

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div
            id="notification"
        >
            <p>{message}</p>
        </div>
    );
};
export default Notification;

Notification.propTypes = {
    message: PropTypes.string,
};