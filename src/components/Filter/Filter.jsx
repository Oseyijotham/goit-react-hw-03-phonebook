import React, { Component } from 'react';
 import { nanoid } from 'nanoid';
import css from './Filter.module.css';
 import PropTypes from 'prop-types';

export class Filter extends Component {
  searchTermId = nanoid();

  render() {
    const { searchTerm, onSearch } = this.props;
    const { shouldRender } = this.props;
    const { contacts } = this.props;
    // Access props using this.props
    return (
      <div className={css.contactList}>
        <label htmlFor={this.searchTermId}>
          <span className={css.formLabel}>Find Contacts By Name</span>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
            value={searchTerm}
            onChange={onSearch}
            id={this.searchTermId}
            autoComplete="off"
            className={css.formInput}
          />
        </label>

        {shouldRender !== '' && (
          <ul className={css.contactsList}>
            {contacts.map(contact => (
              <li key={contact.id}>
                {contact.name}: {contact.number}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

Filter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  shouldRender: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};