import React, { useState, useEffect } from "react";

const PassVault = () => {
  const [items, setItems] = useState([])
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [selectedItem, setSelectedItem] = useState({id:""});
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [formdata,setFormData] = useState({username:"", host:""});

  useEffect(() => {
    const fetchPassVault = async () => {
      fetch('/api/sshvault/list').then(response => response.json())
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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile)
  };

  const handleUploadFileSubmit = (e) => {
    setError('')
    e.preventDefault()
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      const b64data = reader.result.split(',')[1];
      console.log(b64data)
      fetch('/api/sshvault/new',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          file: String(b64data),
          masterPassword: masterPassword,
          username: formdata.username,
          host: formdata.host
        })
      }).then(res => res.json())
      .then(data => console.log(data))
    };
  };

  const handleMasterPassSubmit = (e) => {
    setError('')
    setMessage('')
    e.preventDefault();
    fetch('/api/sshvault/decrypt', {
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
      } else setMessage(data.message)
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
                ? "passVaultItemList active cursor-pointer"
                : "passVaultItemList cursor-pointer"
            }
          >
            <p className="text-md flex justify-between w-full align-middle items-center">
              <span>{item.host}</span>
              <span className="text-sm">User: {item.username}</span>
            </p>
            <h5 className="text-sm">{item.description}</h5>
          </li>
        )) : (
          <div className="text-xl font-[500] text-center">
            Nothing to show
          </div>
        )}
      </ul>
      <div className="vr"></div>
      <div className="item-details">
        {!selectedItem.id ? (
          <div className="text-xl font-[500] text-center">
            {message && (
              <div className="bg-green-500 p-[2px] rounded-md mt-2 max-w-[400px] mb-4">
                <div className="text-white p-[2px] rounded-md bg-black opacity-60">
                  {message}
                </div>
              </div>
            )}
            {error ? (
              <div className="bg-red-500 p-[2px] rounded-md mt-2 max-w-[400px] mb-4">
                <div className="text-white p-[2px] rounded-md bg-black opacity-60">
                  {error}
                </div>
              </div>
            ) : (
              <form onSubmit={handleUploadFileSubmit} className="item-details-form flex gap-2 w-full">
                <input 
                  className="text-white bg-[rgba(48,46,46,0.49)] focus:outline-none focus:border focus:border-[#f39425] text-xl"
                  type="file" onChange={handleFileChange}
                />

                <input
                  className="text-white bg-[rgba(48,46,46,0.49)] focus:outline-none focus:border focus:border-[#f39425] text-xl"
                  type="text" placeholder="Master Password" onChange={handleMasterPassChange}
                />

                <input 
                className="text-white bg-[rgba(48,46,46,0.49)] focus:outline-none focus:border focus:border-[#f39425] text-xl"
                type="text" placeholder="Username" onChange={(e) => setFormData({...formdata, username: e.target.value})}
                />

                <input type="text" placeholder="Host" onChange={(e) => setFormData({...formdata, host: e.target.value})}
                className="text-white bg-[rgba(48,46,46,0.49)] focus:outline-none focus:border focus:border-[#f39425] text-xl"
                />

                <button type="submit" className="px-4 py-2 bg-[#302e2e] rounded-md text-xl hover:bg-[#f39425]">
                  Encrypt SSH Key
                </button>
              </form>
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
          <div>
            goood
          </div>
        )}
      </div>
    </div>
  );
};

export default PassVault;
