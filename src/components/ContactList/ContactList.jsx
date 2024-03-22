import React, { Component } from 'react';

import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export class ContactList extends Component {
  render() {
    const { contacts } = this.props;
    const { children } = this.props;
    const { shouldRender } = this.props;
    const { onDelete } = this.props;
    // Access props using this.props
    return (
      <div className={css.contactsSection}>
        <h3 className={css.contactsTitle}>Contacts</h3>
        {children}
        {shouldRender === '' && (
          <ul className={css.contactsList}>
            {contacts.map(contact => (
              <li key={contact.id} className={css.contactsItem}>
                <span>
                  {contact.name}: {contact.number}
                </span>
                <button
                  type="submit"
                  className={css.contactsButton}
                  name={contact.name}
                  onClick={onDelete}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  children: PropTypes.node, 
  shouldRender: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};