import React, { useState, useEffect } from "react";

const PassVault = () => {
  const [items, setItems] = useState([])
  const [error, setError] = useState("")
  const [selectedItem, setSelectedItem] = useState({id:""});
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");

  useEffect(() => {
    const fetchPassVault = () => {
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
    }).then(res => res.json()).then(data => {
      if (data.error) {
        setError(data.error)
      }
      setSelectedItem(data)
      setIsPasswordEntered(true);
    })
  };

  return (
    <div className="passVaultBody">
      <ul className="password-list">
        {items.length ? items.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              handleItemClick(item);
              console.log(item, selectedItem);
            }}
            className={
              item.id === selectedItem.id
                ? "passVaultItemList active-item cursor-pointer"
                : "passVaultItemList cursor-pointer"
            }
          >
            <p className="flex justify-between w-full align-middle items-center">
              <span className="text-[20px]">{item.service}</span>
              <span className="text-[16px]">User: {item.username}</span>
            </p>
            <h5 className="text-[16px]">{item.description}</h5>
          </li>
        )): (
          <div className="text-xl font-[500] text-center">
            Nothing to show
          </div>
        )}
      </ul>
      <div className="vr"></div>
      <div className="item-details">
        {!selectedItem.id ? (
          <div className="text-xl font-[500] text-center">
            Nothing selected
            {error && (
              <div className="bg-red-500 p-[4px] rounded-md mt-2">
                <div className="text-white p-[4px] rounded-md bg-black opacity-60">
                  {error}
                </div>
              </div>
            )}  
          </div>
        ) : !isPasswordEntered ? (
          <form onSubmit={handleMasterPassSubmit} className="item-details-form">
            <div className="item-details-header">Enter the Master Password to decrypt</div>
            <input
              type="password"
              className="text-white bg-[rgba(48,46,46,0.49)] focus:outline-none focus:border focus:border-[#f39425] text-xl"
              value={masterPassword}
              onChange={handleMasterPassChange}
              placeholder="Enter master password"
            />
            <button type="submit" className="px-4 py-2 bg-[#302e2e] rounded-md text-xl hover:bg-[#f39425]">
              Decrypt
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-2 p-[1px] bg-[#f39425] rounded-md">
            <table>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>Service</td>
                <td>{selectedItem.service}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{selectedItem.description}</td>
              </tr>
              <tr>
                <td>Username</td>
                <td>{selectedItem.username}</td>
              </tr>
              <tr>
                <td>Password</td>
                <td>{selectedItem.password}</td>
              </tr>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassVault;
