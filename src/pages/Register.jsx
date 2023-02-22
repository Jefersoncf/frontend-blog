import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Cadastro</h1>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Resgistrar-se</button>
        {error && <p>{error}</p>}
        <span>
          Já tem uma conta? <Link to="/login">login</Link>
        </span>
      </form>
    </div>
  );
};
export default Register;
