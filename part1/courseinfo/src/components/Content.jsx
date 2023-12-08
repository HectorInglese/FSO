import PropTypes from 'prop-types';

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => (
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            ))}
        </div>
    )
};
Content.propTypes = {
    parts: PropTypes.array
};
export default Content;