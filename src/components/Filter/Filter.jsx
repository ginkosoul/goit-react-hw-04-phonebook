import PropTypes from 'prop-types';
import css from '../Filter/Filter.module.css';

export default function Filter({ handleChange }) {
  const onChange = e => {
    handleChange(e.target.value.trim());
  };
  return <input className={css.input} type="text" onChange={onChange} />;
}

Filter.propTypes = {
  handleChange: PropTypes.func,
};
