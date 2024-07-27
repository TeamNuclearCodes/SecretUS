import React, { useState } from "react";

const PassVault = () => {
  const items = [
    { id: 1, site: "Google", pass: "google" },
    { id: 2, site: "Instagram", pass: "insta" },
    { id: 3, site: "Facebook", pass: "fb" },
  ];
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [password, setPassword] = useState("");

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsPasswordEntered(false);
    setPassword("");
  };

  const handlePassswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    {
      /* Password checking logic */
    }
    setIsPasswordEntered(true);
  };

  return (
    <div className="content">
      <div className="password-list">
        <ul>
          {items.map((item) => (
            <li key={item.id} onClick={() => handleItemClick(item)}>
              {item.site}
            </li>
          ))}
        </ul>
      </div>
      <div className="item-details">
        {!selectedItem ? (
          <div>Nothing selected</div>
        ) : !isPasswordEntered ? (
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={handlePassswordChange}
              placeholder="Enter password"
            />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <div>
            {selectedItem.site}
            {selectedItem.pass}
          </div>
        )}
      </div>
    </div>
  );
};

export default PassVault;
