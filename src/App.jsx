// const KEY_LOCALSTORAGE = 'contactList';

import React, { useEffect } from 'react';
import { ContactForm } from './components/ContactForm/ContactForm';
import { Filter } from './components/Filter/Filter';
import { ContactList } from './components/ContactList/ContactList';
import { PhonebookImg } from './components/PhonebookImg/PhonebookImg';
import css from 'styles/styles.module.css';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getIsLoading, getError } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';
import { Loader } from './components/Loader/Loader';


export const App = () => {
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);


  return (      
    <div className={css.container}>
      {/* <h1 hidden>HW #4 (phonebook)</h1>         */}
      <div className={css.containerPhonebookStyles}>
        <PhonebookImg />
        <section> 
          {/* <h2>Phonebook</h2> */}
          <h1>Phonebook</h1>
          <ContactForm />          
        </section>
        <section className={css.sectionContacts}>
          <h2> Contacts</h2>
          <Filter />
          {isLoading && !error && <Loader/>}
          <ContactList /> 
        </section>                       
      </div>
    </div>
  );
}

// App.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ),
// }