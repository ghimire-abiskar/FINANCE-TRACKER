import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.token);
      navigate("/"); // Redirect to home
    } else {
      alert("Invalid credentials, try again.");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-4">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control form-control-sm"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div >
  );
};

export default Login;
