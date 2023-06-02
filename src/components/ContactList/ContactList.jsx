import PropTypes from 'prop-types';
import css from '../ContactList/ContactList.module.css';
export default function ContactList({ filteredContacts, handleDelete }) {
  return filteredContacts ? (
    <ul className={css.list}>
      {filteredContacts.map(e => (
        <li className={css.item} key={e.id}>
          {`${e.name}: ${e.phone}`}
          <button
            className={css.btn}
            onClick={() => {
              handleDelete(e.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  ) : null;
}

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
  handleDelete: PropTypes.func,
};
