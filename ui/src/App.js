import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage.js";
import CreateAccount from "./components/CreateAccount.js";
import DisplayAll from "./components/DisplayAll.js";
import CreateItem from "./components/CreateItem.js";
import EditItem from "./components/EditItem.js";
import Details from "./components/Details.js";

function App() {

  const [username, setUsername] = useState();

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage setUsername={setUsername} />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/items/" element={<DisplayAll username={username} userPage={false} setUsername={setUsername} />} />
        <Route path="/items/:username" element={<DisplayAll username={username} userPage={true} setUsername={setUsername} />} />
        <Route path="/items/create" element={<CreateItem username={username} />} />
        <Route path="/items/edit/:itemId" element={<EditItem username={username} />} />
        <Route path="/items/details/:itemId" element={<Details username={username} />} />
      </Routes>
    </>
  );
}

export default App;
