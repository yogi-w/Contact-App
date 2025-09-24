import { useState } from "react";
import { ContactProvider } from "./context/ContactContext";
import ContactForm from "./Components/ContactForm";
import ContactList from "./Components/ContactList";

function App() {
  const [editContact, setEditContact] = useState(null);

  return (
    <ContactProvider>
      <div className="h-screen flex my-20 justify-center ">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-center">Contact App</h1>

          {/* Pass editContact state */}
          <ContactForm editContact={editContact} setEditContact={setEditContact} />
          <ContactList setEditContact={setEditContact} />
        </div>
      </div>
    </ContactProvider>
  );
}

export default App;
