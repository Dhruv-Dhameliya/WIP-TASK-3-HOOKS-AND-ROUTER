import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";
import "./App.css";

const FormContext = React.createContext();

const FormProvider = ({ children }) => {
  const [isValid, setIsValid] = useState(false);

  const validateForm = useCallback((email, password) => {
    const isEmailValid = email.includes("@");
    const isPasswordValid = password.length >= 6;
    setIsValid(isEmailValid && isPasswordValid);
  }, []);

  return (
    <FormContext.Provider value={{ isValid, validateForm }}>
      {children}
    </FormContext.Provider>
  );
};

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isValid, validateForm } = useContext(FormContext);

  useEffect(() => {
    validateForm(email, password);
  }, [email, password, validateForm]);

  const formattedEmail = useMemo(() => email.trim().toLowerCase(), [email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">FORM</h1>
      <form className="form">
        <div className="input-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
            className="form-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            className="form-input"
          />
        </div>

        <p className="formatted-email">Formatted Email: {formattedEmail}</p>

        <button
          type="submit"
          className={`submit-btn ${!isValid ? "disabled" : ""}`}
          disabled={!isValid}
        >
          Submit
        </button>

        <p className={`validation-message ${isValid ? "valid" : "invalid"}`}>
          {isValid ? "Form is valid" : "Form is invalid"}
        </p>
      </form>
    </div>
  );
};

function App() {
  return (
    <FormProvider>
      <Form />
    </FormProvider>
  );
}

export default App;
