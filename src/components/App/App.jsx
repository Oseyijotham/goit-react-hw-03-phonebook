/*export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      React homework template
    </div>
  );
};*/

import React, { Component } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (savedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleNameChange = evt => {
    const { value } = evt.target;

    let uniqueId;
    uniqueId = nanoid();

    this.setState({
      id: uniqueId,
      name: value.trim(),
    });
  };

  handleNumberChange = evt => {
    const { value } = evt.target;

    this.setState({
      number: value.trim(),
    });
  };

  handleButtonPress = evt => {
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
    }, 200);
    const { contacts } = this.state;
    const { id, name, number } = this.state;

    const isNameDuplicate = contacts.some(contact => contact.name === name);
    if (isNameDuplicate) {
      alert('This name already exists');

      return;
    }

    if (
      id !== '' &&
      name !== '' &&
      number !== '' &&
      id !== null &&
      name !== null &&
      number !== null &&
      id !== undefined &&
      name !== undefined &&
      number !== undefined
    ) {
      contacts.push({ id, name, number });
      console.log(contacts);
      return;
    } else {
      alert('Enter all Feilds');
      return;
    }
  };

  handleSubmit = evt => {
    evt.preventDefault();
    evt.target.reset();

    this.setState({
      name: '',
      number: '',
    });
  };

  handleSearch = evt => {
    const { contacts } = this.state;

    const { value } = evt.target;

    this.setState({ filter: value });

    const bestMatches = contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(value.trim().toLowerCase()) &&
        value.trim() !== ''
    );

    this.setState({ filteredArray: bestMatches });
  };

  handleDelete = evt => {
    const { contacts } = this.state;
    const { name } = evt.target;

    const myIndex = contacts.findIndex(contact => contact.name === name);

    console.log(myIndex);

    contacts.splice(myIndex, 1);

    this.setState({ contacts: contacts });
    console.log(contacts);
  };

  render() {
    const { name, number } = this.state.contacts;
    const { filter } = this.state;
    const { contacts } = this.state;
    const { filteredArray } = this.state;

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <ContactForm
          name={name}
          number={number}
          onNameChange={this.handleNameChange}
          onNumberChange={this.handleNumberChange}
          onButtonPress={this.handleButtonPress}
          onCompletion={this.handleSubmit}
        >
          <ContactList
            contacts={contacts}
            shouldRender={filter}
            onDelete={this.handleDelete}
          >
            <Filter
              contacts={filteredArray}
              searchTerm={filter}
              onSearch={this.handleSearch}
              shouldRender={filter}
            />
          </ContactList>
        </ContactForm>
      </div>
    );
  }
}
