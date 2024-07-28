import React, { useState, useEffect } from "react";
import "./PassVault.css";

const PassVault = () => {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState({id:""});
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");

  useEffect(() => {
    const fetchPassVault = async () => {
      fetch('/api/passvault/list').then(response => response.json())
      .then(data => setItems(data));
    }
    fetchPassVault();
  },[])

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
    fetch('/api/passvault/decrypt', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        masterPassword: masterPassword,
        id: selectedItem.id
      })
    }).then(res => res.json()).then(data => setSelectedItem(data))
    setIsPasswordEntered(true);
  };

  return (
    <div className="passVaultBody">
      <ul className="password-list">
        {console.log(items)}
        {items && items.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              handleItemClick(item);
              console.log(item, selectedItem);
            }}
            className={
              item.id === selectedItem.id
                ? "passVaultItemList active cursor-pointer"
                : "passVaultItemList cursor-pointer"
            }
          >
            {item.service}
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
              className="text-black"
              value={masterPassword}
              onChange={handleMasterPassChange}
              placeholder="Enter master password"
            />
            <button type="submit" className="button">
              Submit
            </button>
          </form>
        ) : (
          <div className="flex">
            {selectedItem.service}
            {selectedItem.description}
            {selectedItem.username}
            {selectedItem.password}
          </div>
        )}
      </div>
    </div>
  );
};

export default PassVault;
