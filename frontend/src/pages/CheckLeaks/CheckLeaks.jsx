import React, { useState } from "react";
import "./CheckLeaks.css";
import formLogo from "../../images/form_logo.png";

// const crypto = require("crypto");

const CheckLeaks = () => {
  const [password, setPassword] = useState("");
  const [beenPwned, setBeenPwned] = useState(null);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  async function sha1(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  async function checkPassword(password) {
    const hash = String(await sha1(password));
    const prefix = hash.substring(0, 5);
    console.log(hash, prefix);
    const suffix = hash.substring(5).toUpperCase();

    const response = await fetch(
      `https://api.pwnedpasswords.com/range/${prefix}`
    );
    const data = await response.text();

    const regex = new RegExp(`^${suffix}:\\d+$`, "m");
    return regex.test(data);
  }

  const handleCheck = () => {
    checkPassword(password).then((isPwned) => {
      if (isPwned) {
        setBeenPwned(true);
      } else {
        setBeenPwned(false);
      }
    });
  };

  return (
    <div className="content">
      <div className="imgcontainer">
        <img src={formLogo} alt="logo" className="logo"></img>
      </div>
      <input
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="Enter password"
        className="leak-input"
      />
      <button onClick={handleCheck} className="leak-btn">
        Check
      </button>
      {beenPwned !== null &&
        (beenPwned ? (
          <div className="danger">Your password has leaked somewhere!</div>
        ) : (
          <div className="safe">Your password is safe</div>
        ))}
    </div>
  );
};

export default CheckLeaks;
