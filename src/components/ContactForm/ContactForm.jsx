// import propTypes from 'prop-types';
import React, { useState } from 'react';
import css from './ContactForm.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';


export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const items = useSelector(getContacts);
  
  const handleChangeName = evt => {
    const {value} = evt.target;
    setName(value);
  };

  const handleChangeNumber = evt => {
    const {value} = evt.target;
    setNumber(value);
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const contactsLists = [...items];
    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContact({ name: name, phone: number }));
      setName('');
      setNumber('');
    }

    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleFormSubmit}>
      {/* <label className={css.formLabel}>Name </label> */}
      <label className={css.formLabel}>Name 
        <input
          className={css.formName}
          type="text"
          name="name"
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required          
          onChange={handleChangeName}          
          value={name}
          placeholder="Enter name"
        />
      </label>
      <label className={css.formLabel}>Number
        <input
          className={css.formNumber}
          type="tel"
          name="number"
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChangeNumber}
          value={number}
          placeholder="Enter phone number"
        />
      </label>
      <button className={css.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
}

// ContactForm.propTypes = {
//   handleSubmit: propTypes.func.isRequired,
// };
