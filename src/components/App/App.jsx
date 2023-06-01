import { Component } from 'react';
import { nanoid } from 'nanoid';

import Filter from '../Filter/Filter';
import Contacts from '../Contacts/Contacts';
import css from '../App/App.module.css';
import ContactList from 'components/ContactList/ContactList';

class App extends Component {
  static LS_KEY = 'phonebook-data';
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(App.LS_KEY)) || [];
    this.setState(pv => ({ ...pv, contacts }));
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts === this.state.contacts) return;
    localStorage.setItem(App.LS_KEY, JSON.stringify(this.state.contacts));
  }
  handleFilterInput = e => {
    const filter = e.target.value.trim();
    this.setState(pValue => ({ ...pValue, filter }));
  };
  handleRemove = e => {
    const { id } = e.target;
    if (id)
      this.setState(pValue => ({
        ...pValue,
        contacts: pValue.contacts.filter(e => e.id !== id),
      }));
  };
  handleSubmit = value => {
    const { contacts } = this.state;
    if (contacts.find(e => e.name === value.name)) {
      alert('Already in the list');
      return;
    }
    const newElement = { ...value, id: nanoid() };
    this.setState(pv => ({
      ...pv,
      contacts: [...pv.contacts, newElement],
    }));
  };
  filterContacts = (filter, contacts) => {
    const normFilter = filter.toLowerCase().trim();
    return contacts.filter(e => e.name.toLowerCase().includes(normFilter));
  };
  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.filterContacts(filter, contacts);
    return (
      <div className={css.wrapper}>
        <h1>Phonebook</h1>
        <Contacts handleSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter handleChange={this.handleFilterInput} />
        <ContactList
          filteredContacts={filteredContacts}
          handleDelete={this.handleRemove}
        />
      </div>
    );
  }
}

export default App;
