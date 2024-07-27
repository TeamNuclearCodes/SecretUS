import React, { useState } from "react";
import "./PassVault.css"


const PassVault = () => {
  const items = [
    { id: 1, site: "Google", pass: "google" },
    { id: 2, site: "Instagram", pass: "insta" },
    { id: 3, site: "Facebook", pass: "fb" },
  ];
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsPasswordEntered(false);
    setMasterPassword("");
  };

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

  return (
    <div>
      <div className="password-list">
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="passVaultItemList"
            >
              {item.site}
            </li>
          ))}
        </ul>
      </div>
      <div className="item-details">
        {!selectedItem ? (
          <div>Nothing selected</div>
        ) : !isPasswordEntered ? (
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
