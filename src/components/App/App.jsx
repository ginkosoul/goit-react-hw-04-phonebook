import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import css from '../App/App.module.css';
import { ContactList, Filter, Contacts } from 'components';

export default function App() {
  const LS_KEY = 'phonebook-data';
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(LS_KEY)) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleRemove = id => {
    setContacts(prev => prev.filter(e => e.id !== id));
  };
  const handleSubmit = value => {
    if (contacts.find(e => e.name === value.name)) {
      alert('Already in the list');
      return;
    }
    const newElement = { ...value, id: nanoid() };
    setContacts(prev => [...prev, newElement]);
  };
  const filterContacts = (filter, contacts) => {
    const normFilter = filter.toLowerCase().trim();
    return contacts?.filter(e => e.name.toLowerCase().includes(normFilter));
  };
  const filteredContacts = filterContacts(filter, contacts);
  return (
    <div className={css.wrapper}>
      <h1>Phonebook</h1>
      <Contacts handleSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter handleChange={setFilter} />
      <ContactList
        filteredContacts={filteredContacts}
        handleDelete={handleRemove}
      />
    </div>
  );
}
