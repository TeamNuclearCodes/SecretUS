import React, { useState } from "react";
import "./PassVault.css";

const PassVault = () => {
  const items = [
    { id: 1, site: "www.google.com", pass: "google" },
    { id: 2, site: "www.instagram.com", pass: "insta" },
    { id: 3, site: "www.facebook.com", pass: "fb" },
  ];
  const [selectedItem, setSelectedItem] = useState({id:""});
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
    <div className="passVaultBody">
      <ul className="password-list">
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              handleItemClick(item);
              console.log(item, selectedItem);
            }}
            className={
              item.id === selectedItem.id
                ? "passVaultItemList active"
                : "passVaultItemList"
            }
          >
            {item.site}
          </li>
        ))}
      </ul>
      <div className="vr"></div>
      <div className="item-details">
        {!selectedItem ? (
          <div>Nothing selected</div>
        ) : !isPasswordEntered ? (
          <form onSubmit={handleMasterPassSubmit} className="item-details-form">
            <div className="item-details-header">Enter Master Password</div>
            <input
              type="password"
              value={masterPassword}
              onChange={handleMasterPassChange}
              placeholder="Enter master password"
            />
            <button type="submit" className="button">
              Submit
            </button>
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
