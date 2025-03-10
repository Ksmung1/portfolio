import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import UserContext

const Auth = () => {
  const nav = useNavigate();
  const { setUser } = useUser();
  const [code, setCode] = useState("");
  const [welcomeText, setWelcomeText] = useState("");
  const [promptText, setPromptText] = useState("");

  const welcomeMessage = "Welcome to VIP Club.";
  const promptMessage = "Please enter your Code|";

  // Typewriter effect function (FIXED)
  const typeWriter = (message, setter, onComplete) => {
    let index = 0;
    let text = ""; // Store text separately to prevent React's async update issue

    const interval = setInterval(() => {
      text += message.charAt(index); // Append one character at a time
      setter(text); // Update state with the new string
      index++;

      if (index >= message.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 50);
  };

  // Start animations in order
  useEffect(() => {
    typeWriter(welcomeMessage, setWelcomeText, () => {
      typeWriter(promptMessage, setPromptText);
    });
  }, []);

  const handleClick = () => {
    if (code === "007") {
      setUser(true);
      nav("/dashboard");
    } else {
      alert("Incorrect Code. Unauthorized!");
      setUser(null);
      setCode("")
      nav("/");
    }
  };

  return (
    <div className="auth-screen flex-col mid relative">
      <p className="typewriter-text">{welcomeText}</p>
      <p className="typewriter-text">{promptText}</p>
      <input
        type="password"
        name="login-code"
        id="login-code"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleClick}>Secret Code</button>
    </div>
  );
};

export default Auth;
