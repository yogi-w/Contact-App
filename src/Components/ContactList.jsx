import { useState } from "react";
import { useContact } from "../context/ContactContext";

export default function ContactList({ setEditContact }) {
  const { contacts, deleteContact } = useContact();
    const [search, setsearch] = useState('')

     const filterData = contacts.filter((contact) => (
        contact.name.toLowerCase().includes(search)
     ))

  return (
    <div className="space-y-3 mt-4 mx-5 flex flex-col justify-center items-center ">
        <input placeholder="Search your contact..."
        className="text-black bg-gray-400 w-full rounded-xl p-3 font-semibold text-xl my-3"
        type="search"
        onChange={(e) => (setsearch(e.target.value))}
        />
      {contacts.length > 0 ? (
        filterData.map((c) => (
          <div
            key={c.id}
            className="bg-gray-400 p-4 w-full rounded-2xl shadow-sm flex justify-between items-center mt-4"
          >
            <div>
              <h2 className="text-xl text-black font-bold">{c.name}</h2>
              <p className="text-black text-sm md:text-lg font-semibold">{c.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditContact(c)}
                className=" text-white px-1 py-1 rounded-xl hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteContact(c.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No contacts yet...</p>
      )}
    </div>
  );
}
