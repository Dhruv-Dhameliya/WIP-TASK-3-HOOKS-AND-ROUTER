import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "user@gmail.com" && password === "1234") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      alert("Invalid credentials! Use user@gmail.com / 1234 ");
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <h1 className="text-center text-2xl sm:text-4xl py-10 font-medium">
        Login
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          className="mb-4 p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="mb-4 p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-orange-700 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
