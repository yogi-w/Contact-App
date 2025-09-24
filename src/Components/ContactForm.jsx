import { useState, useEffect } from "react";
import { useContact } from "../context/ContactContext";

export default function ContactForm({ editContact, setEditContact }) {
  const { addContact, updateContact } = useContact();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Load data when editing
  useEffect(() => {
    if (editContact) {
      setName(editContact.name);
      setEmail(editContact.email);
    }
  }, [editContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    if (editContact) {
      // Update contact
      updateContact(editContact.id, { name, email });
      setEditContact(null); // Reset edit state
    } else {
      // Add new contact
      addContact({ name, email });
    }

    setName("");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-600 py-10 px-10 mx-5 shadow-md rounded-2xl flex flex-col gap-y-4 items-center"
    >
      <input
        type="text"
        placeholder="Name"
        className="border p-2 rounded-xl flex-1 w-full "
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded-xl flex-1 w-full"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className={`${
          editContact ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
        } text-white px-6 py-2 rounded-xl `}
      >
        {editContact ? "Update" : "Add"}
      </button>
    </form>
  );
}
