import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

// 1️ Create context
const ContactContext = createContext({
  contacts: [],
  addContact: () => {},
  updateContact: () => {},
  deleteContact: () => {},
});

// 2️ Provider component
export const ContactProvider = ({ children }) => {
const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : [{ id: 1, name: "Yogi", email: "yogi@example.com" }];
  });

  const addContact = (newContact) =>
    setContacts((prev) => [
      ...prev,
      { id: Date.now(), ...newContact }, // add id automatically
    ]);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const updateContact = (id, updatedContact) =>
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedContact } : c))
    );

  const deleteContact = (id) =>
    setContacts((prev) => prev.filter((c) => c.id !== id));

  return (
    <ContactContext.Provider
      value={{ contacts, addContact, updateContact, deleteContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};

// 3️ Custom hook 
export const useContact = () => useContext(ContactContext);

export default ContactContext;
