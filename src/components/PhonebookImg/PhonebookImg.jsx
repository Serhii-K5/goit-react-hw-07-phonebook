// import propTypes from 'prop-types';
import css from './PhonebookImg.module.css';
import notepadSpring from 'images/notepad-spring.jpg';

export const PhonebookImg = () =>
  (<div>
    <img className={css.imgPhonebook} src={notepadSpring} alt='notepad spring' width='100%'/>
  </div>)
