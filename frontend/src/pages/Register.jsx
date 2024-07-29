import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
  });

  const inputClasses = (other) => {
    return `text-white bg-[rgba(48,46,46,0.49)] border border-[rgba(48,46,46,0.49)] focus:outline-none focus:border focus:border-[#f39425] text-xl px-4 py-2 rounded-md ${other}`;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch('/api/settings/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: formData.password
      })
    }).then(res => res.json())
    .then(data => {
        if (data?.message) {
            navigate('/')
        }
    });
  }

  return (
    <div className='flex bg-[#221f1f] h-dvh'>
      <form
        onSubmit={handleFormSubmit}
        className="m-auto text-xl font-[600] flex flex-col gap-2"
      >
          <h4>SecretUS requires a master password for encrypting data</h4>
          <input
            type="password"
            value={formData.password}
            className={inputClasses()}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="Enter Master Password"
          />
        <button type="submit" className={inputClasses("bg-[#302e2e] hover:bg-[#f39425]")}>
          Save Master Password
        </button>
      </form>
    </div>
  )
}

export default Register