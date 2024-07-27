import React from "react";

const Home = () => {
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");
  // new password inputs
  const [addingPassword, setAddingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [service, setService] = useState("");
  const [desc, setDesc] = useState("");

  const handleMasterPassChange = (e) => {
    setMasterPassword(e.target.value);
  };

  const handleMasterPassSubmit = (e) => {
    e.preventDefault();
    {
      /* Password checking logic */
    }
    setIsPasswordEntered(true);
  };

  const addPassword = () => {
    setAddingPassword(true);
  };

  const handleAddFormInput = (e, handleFunc) => {
    handleFunc(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handle}>
        <input
          type="password"
          value={newPassword}
          onChange={handleAddFormInput(setNewPassword)}
          placeholder="Enter password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
