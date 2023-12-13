import PropTypes from 'prop-types';

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    const style = {
        color: message.split(' ').includes('Error') ? 'red' : 'green',
    }

    return (
        <div
            id="notification"
            style={style}
        >
            {message}
        </div>
    );
};
export default Notification;

Notification.propTypes = {
    message: PropTypes.string,
};