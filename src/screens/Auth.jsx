import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import UserContext

const Auth = () => {
  const nav = useNavigate();
  const { setUser } = useUser();
  const [code, setCode] = useState("");
  const [welcomeText, setWelcomeText] = useState("");
  const [promptText, setPromptText] = useState("");
  const [showCursor, setShowCursor] = useState(false); // To handle blinking cursor

  const welcomeMessage = "Hello, this is Black Diamond, \n your trusted Fund Manager! ";

  const promptMessage = `Please enter your Code.`;

  // Typewriter effect function
  const typeWriter = (message, setter, onComplete) => {
    let index = 0;
    let text = "";

    const interval = setInterval(() => {
      text += message.charAt(index);
      setter(text);
      index++;

      if (index >= message.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 50);
  };

  useEffect(() => {
    typeWriter(welcomeMessage, setWelcomeText, () => {
      typeWriter(promptMessage, setPromptText, () => {
        setShowCursor(true); // Show blinking cursor after typing
      });
    });
  }, [promptMessage]);

  const handleClick = () => {
    if (code === "007") {
      setUser(true);
      nav("/dashboard");
    } else {
      alert("Incorrect Code. Unauthorized!");
      setUser(null);
      setCode("");
      nav("/");
    }
  };

  return (
    <div className="auth-screen flex-col mid relative">
      <img src="/image2.jpg" alt="imafe" />
      <p className="typewriter-text type-text-1" style={{whiteSpace:"pre-line"}}>{welcomeText}</p>
      <p className="typewriter-text" style={{whiteSpace:"pre-line", textAlign: 'center'}}>
        {promptText}
        {showCursor && <span className="blinking">|</span>}
      </p>
      <input
        type="password"
        name="login-code"
        id="login-code"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleClick}>Secret Code</button>
      <p onClick={()=>nav('/about')} className="point " style={{border: '1px solid white', padding:'5px', borderRadius:'10px', marginTop:'100px'}}>More about me...</p>

    </div>
    
  );
};

export default Auth;
