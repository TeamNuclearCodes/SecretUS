import React, { useState } from "react";

const AddPassword = () => {
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");
  // new password inputs
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

  const handleAddFormInput = (e, handleFunc) => {
    handleFunc(e.target.value);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    // send data to store
  };

  return (
    <div>
      {!isPasswordEntered ? (
        <form onSubmit={handleMasterPassSubmit}>
          <input
            type="password"
            value={masterPassword}
            onChange={handleMasterPassChange}
            placeholder="Enter master password"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <form onSubmit={handleAddFormSubmit}>
          <input
            // type="text"
            value={username}
            onChange={handleAddFormInput(setUsername)}
            placeholder="Enter username"
          />
          <input
            type="password"
            value={newPassword}
            onChange={handleAddFormInput(setNewPassword)}
            placeholder="Enter password"
          />
          <input
            // type="text"
            value={service}
            onChange={handleAddFormInput(setService)}
            placeholder="Enter service"
          />
          <input
            type="text"
            value={desc}
            onChange={handleAddFormInput(setDesc)}
            placeholder="Enter description"
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AddPassword;
