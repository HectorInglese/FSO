import PropTypes from 'prop-types';

const Total = ({ parts }) => {

    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <div>
            <p>
                Number of exercises {totalExercises}
            </p>
        </div>
    );
};

Total.propTypes = {
    parts: PropTypes.array
};
export default Total;