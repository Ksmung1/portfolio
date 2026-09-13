import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const WELCOME_MESSAGE = "Hello, this is Black Diamond,\nyour trusted Fund Manager!";
const PROMPT_MESSAGE = "Please enter your Code.";

const Auth = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const codeInputRef = useRef(null);
  const [code, setCode] = useState("");
  const [welcomeText, setWelcomeText] = useState("");
  const [promptText, setPromptText] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const timers = new Set();

    const wait = (duration) =>
      new Promise((resolve) => {
        const timer = window.setTimeout(() => {
          timers.delete(timer);
          resolve();
        }, duration);
        timers.add(timer);
      });

    const typeMessage = async (message, setter, speed) => {
      for (let index = 1; index <= message.length; index += 1) {
        if (cancelled) return;
        setter(message.slice(0, index));
        await wait(speed);
      }
    };

    const runIntro = async () => {
      await typeMessage(WELCOME_MESSAGE, setWelcomeText, 42);
      await wait(350);
      await typeMessage(PROMPT_MESSAGE, setPromptText, 28);

      if (!cancelled) setIsReady(true);
    };

    runIntro();

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (isReady) codeInputRef.current?.focus();
  }, [isReady]);

  const handleCodeChange = (event) => {
    setCode(event.target.value.replace(/\D/g, "").slice(0, 3));
    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (code === "007") {
      setUser(true);
      navigate("/dashboard");
      return;
    }

    setUser(null);
    setCode("");
    setError("That access code is not recognized. Please try again.");
    codeInputRef.current?.focus();
  };

  const introComplete = welcomeText === WELCOME_MESSAGE;

  return (
    <main className="auth-screen">
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />

      <section className="auth-card" aria-labelledby="auth-title">
        <header className="auth-brand">
          <div className="auth-logo-frame">
            <img src="/black-diamond.png" alt="Black Diamond" />
          </div>
        </header>

        <div className="auth-copy" aria-live="polite">
          <span className="auth-overline">Secure access</span>
          <h1 id="auth-title">
            {welcomeText}
            {!introComplete && <span className="typing-cursor" aria-hidden="true" />}
          </h1>
          <p>
            {promptText}
            {introComplete && !isReady && (
              <span className="typing-cursor prompt-cursor" aria-hidden="true" />
            )}
          </p>
        </div>

        <form
          className={`auth-form ${isReady ? "is-ready" : ""}`}
          onSubmit={handleSubmit}
        >
          <label htmlFor="login-code">Access code</label>
          <div className={`auth-input-shell ${error ? "has-error" : ""}`}>
            <span className="auth-lock" aria-hidden="true" />
            <input
              ref={codeInputRef}
              type="password"
              inputMode="numeric"
              autoComplete="current-password"
              name="login-code"
              id="login-code"
              maxLength={3}
              placeholder="•••"
              value={code}
              onChange={handleCodeChange}
              disabled={!isReady}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "auth-error" : undefined}
            />
          </div>
          <div className="auth-form-meta">
            <span>3-digit private key</span>
            <span>{code.length}/3</span>
          </div>
          {error && (
            <p className="auth-error" id="auth-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" disabled={!isReady || code.length !== 3}>
            <span>Unlock portfolio</span>
            <span className="auth-arrow" aria-hidden="true">→</span>
          </button>
        </form>

        <button className="auth-about" type="button" onClick={() => navigate("/about")}>
          About Black Diamond <span aria-hidden="true">↗</span>
        </button>

        <footer className="auth-security">
          <span className="security-dot" />
          Local private session
        </footer>
      </section>
    </main>
  );
};

export default Auth;
