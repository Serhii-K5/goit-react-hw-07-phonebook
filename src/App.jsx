import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContactForm } from './components/ContactForm/ContactForm';
import { Filter } from './components/Filter/Filter';
import { ContactList } from './components/ContactList/ContactList';
import { PhonebookImg } from './components/PhonebookImg/PhonebookImg';
import css from 'styles/styles.module.css';
import defaultData from 'data/data.json'

import { getContacts, getFilter } from 'redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact } from 'redux/contactsSlice';

import { nanoid } from 'nanoid';

const KEY_LOCALSTORAGE = 'contactList';

export const App = () => {
  const contacts = useSelector(getContacts);
  
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  
  const [isFirstRender, setFlag] = useState(true);
  
  useEffect(() => {
    if (isFirstRender) {
      const contacts = localStorage.getItem('KEY_LOCALSTORAGE');
      setFlag(false);
      const parsed = contacts === null || contacts === 'undefined' ? defaultData : JSON.parse(contacts);
      if (parsed) { }
      
    } else {
      localStorage.setItem('contactList', JSON.stringify(contacts));
    }
  }, [contacts, isFirstRender]);

  const handleSubmit = evt => {
    const name = evt.name;
    const number = evt.number;
    const contactsLists = [...contacts];

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      return alert(`${name} is already in contacts.`);
    }

    const сontact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };
    
    dispatch(addContact(сontact));
    localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(contactsLists));
  };

  const сontactFiltered = () => {
    const filterContactsList = contacts.filter(contact => {
      if (contact.name === undefined) {
        return '';
      } else {
        return contact.name
          .toLowerCase()
          .includes(filter.toLowerCase());
      }
    });

    return filterContactsList;
  };

  const handleDelete = evt => {
    dispatch(deleteContact(evt));
  };

  return (      
    <div className={css.container}>
      {/* <h1 hidden>HW #4 (phonebook)</h1>         */}
      <div className={css.containerPhonebookStyles}>
        <PhonebookImg />
        <section> 
          {/* <h2>Phonebook</h2> */}
          <h1>Phonebook</h1>
          <ContactForm handleSubmit={handleSubmit} />          
        </section>
        <section className={css.sectionContacts}>
          <h2> Contacts</h2>
          <Filter/>
          <ContactList
            contacts={сontactFiltered()}
            handleDelete={handleDelete}
          /> 
        </section>                       
      </div>
    </div>
  );
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
}