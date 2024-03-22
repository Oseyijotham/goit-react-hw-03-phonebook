import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';


export class ContactForm extends Component {
    


  contactNameId = nanoid();
  contactNumberId = nanoid();



  render() {
      const {
        name,
        number,
        onNameChange,
        onNumberChange,
        onCompletion,
        children,
        onButtonPress
        
      } = this.props;

       

    return (
      <div className={css.phoneBook}>
        <h2 className={css.formTitle}>Phonebook</h2>
        <form onSubmit={onCompletion} className={css.formSection}>
          <label htmlFor={this.contactNameId}>
            <span className={css.formLabel}>Name</span>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
              required
              value={name}
              onChange={onNameChange}
              id={this.contactNameId}
              
              autoComplete="off"
              className={css.formInput}
            />
          </label>
          <label>
            <span className={css.formLabel}>Number</span>
            <input
              type="tel"
              placeholder="Enter Number"
              autoComplete="off"
              name="number"
              value={number}
              required
              onChange={onNumberChange}
              className={css.formInput}
              id={this.contactNumberId}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            />
          </label>
          <div className={css.buttonArea}>
            <button
              type="submit"
              name="button"
              onClick={onButtonPress}
              className={css.button}
            >
              Add Contact
            </button>
          </div>
        </form>
        {children}
      </div>
    );
  }
}

ContactForm.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onNumberChange: PropTypes.func.isRequired,
  onCompletion: PropTypes.func.isRequired,
  children: PropTypes.node,
  onButtonPress: PropTypes.func.isRequired,
  
};