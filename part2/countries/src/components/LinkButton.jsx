import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
const LinkButton = ({ id }) => {
  return (
    <Link
      to={`/${id}`}
      role="button"
    >
      Ver detalle
    </Link>
  );
}; LinkButton.propTypes = { id: PropTypes.string }; export default LinkButton;