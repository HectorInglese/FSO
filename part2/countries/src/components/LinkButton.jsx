import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
const LinkButton = ({ name }) => {
  return (
    <Link
      to={`/country/${name}`}
      role="button"
      className=" py-2 border-solid border-2 border-blue-300 hover:bg-blue-100 rounded-md w-full text-center"
    >
      Ver detalle
    </Link>
  );
}; LinkButton.propTypes = { name: PropTypes.string }; export default LinkButton;