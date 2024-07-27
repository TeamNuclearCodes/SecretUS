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

  return (
    <div className="password-list">
      <ul>
        {items.map((item) => (
          <li key={item.id} onClick={() => handleItemClick(item)}>
            {item.site}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PassVault;
