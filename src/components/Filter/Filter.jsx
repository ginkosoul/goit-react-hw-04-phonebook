import PropTypes from 'prop-types';
import css from '../Filter/Filter.module.css';

export default function Filter({ handleChange }) {
  return <input className={css.input} type="text" onChange={handleChange} />;
}

Filter.propTypes = {
  handleChange: PropTypes.func,
};
