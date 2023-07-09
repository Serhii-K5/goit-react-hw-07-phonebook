// import propTypes from 'prop-types';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { getContacts, getFilter } from 'redux/selectors';

const getVisibleContacts = (contacts, filter) => {
  if (!filter) {
    return contacts;
  } else {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
};

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const visibleContacts = getVisibleContacts(contacts, filter);

  const dispatch = useDispatch();
  const handleDelete = id => dispatch(deleteContact(id));
  
  return (
    <ul>
      {visibleContacts.map((contact, id) => (
        <li key={id} className={css.contactListItem}>
          {contact.name}: {contact.number}          
          <button
            type="button"
            className={css.contactDeleteBtn}
            onClick={() => handleDelete(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>    
  )
};

// ContactList.propTypes = {
//   contacts: propTypes.arrayOf(
//     propTypes.exact({
//       id: propTypes.string.isRequired,
//       name: propTypes.string.isRequired,
//       number: propTypes.string.isRequired,
//     })
//   ),
//   handleDelete: propTypes.func.isRequired,
// };