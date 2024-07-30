import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const inputClasses = (other) => {
    return `text-white bg-[rgba(48,46,46,0.49)] border border-[rgba(48,46,46,0.49)] focus:outline-none focus:border focus:border-black text-xl px-4 py-2 rounded-md ${other}`;
  }

  const navigate = useNavigate()
  const [masterPassword, setMasterPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(masterPassword)
    fetch('/api/settings/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        masterPassword: masterPassword
      })
    }).then(res => res.json())
    .then(data => {
      if (data?.error) {
        setError(data.error);
      } else {
        navigate('/register');
      }
    })
  }

  return (
    <div className="passVaultBody">
      <div className='flex h-dvh w-full'>
        <div className='m-auto'>
          <div className="flex flex-col gap-3 text-center">
            <h4 className="text-2xl font-[600]">Close your account</h4>
            <div className="bg-red-700 p-[2px] rounded-md">
              <p className="bg-black opacity-70 p-1 text-lg rounded-md max-w-md">
              Once you close your account, your data cannot be retrieved. This includes encrypted passwords, SSH private keys and PGP private keys
              </p>
            </div>
            <form onSubmit={handleSubmit} className="font-[600] flex flex-col gap-2 mt-5">
              {error && (
                <p className="text-red-700">
                  {error}
                </p>
              )}
              <input
                type="password"
                value={masterPassword}
                className={inputClasses()}
                onChange={(e) => setMasterPassword(e.target.value)}
                placeholder="Enter Master Password"
              />
              <button type="submit" className={inputClasses("bg-[#302e2e] hover:bg-red-700 border-red-700")}>
                Delete My Data
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings