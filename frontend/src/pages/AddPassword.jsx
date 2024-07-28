import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const AddPassword = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    masterPassword: '',
    password: '',
    username: '',
    service: '',
    description: '',
  })

  const inputClasses = (other) => {
    return `text-white bg-[rgba(48,46,46,0.49)] border border-[rgba(48,46,46,0.49)] focus:outline-none focus:border focus:border-[#f39425] text-xl px-4 py-2 rounded-md ${other}`
  }

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    fetch('/api/passvault/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        masterPassword: formData.masterPassword,
        username: formData.username,
        password: formData.password,
        service: formData.service,
        description: formData.description,
      })
    }).then(res => res.json())
    .then(data => {
      if (data.error) setError(data.error)
      else if (data.message) navigate('/passvault')
    })
  };

  return (
    <div className="m-auto">
      <h3 className="text-center text-2xl font-[500] mb-8">Add a new password to Pass Vault</h3>
      <form onSubmit={handleAddFormSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={formData.username}
          className={inputClasses()}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          placeholder="Enter Username"
        />
        <input
          type="password"
          value={formData.password}
          className={inputClasses()}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          placeholder="Enter Password"
        />
        <input
          type="text"
          value={formData.service}
          className={inputClasses()}
          onChange={(e) => setFormData({...formData, service: e.target.value})}
          placeholder="Enter Service"
        />
        <input
          type="text"
          value={formData.description}
          className={inputClasses()}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Enter Description"
        />
        <input
          type="password"
          value={formData.masterPassword}
          className={inputClasses()}
          onChange={(e) => setFormData({...formData, masterPassword: e.target.value})}
          placeholder="Master Password for encryption"
        />
        <button type="submit" className={inputClasses("bg-[#302e2e] hover:bg-[#f39425]")}>
          Encrypt Password
        </button>
      </form>
    </div>
  );
};

export default AddPassword;
