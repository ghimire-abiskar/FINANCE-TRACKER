import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notify from "./Notify";
const Signup = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.token);
      navigate("/");
      setMsg("Signup successfull")
      setAlert(true);
      setTimeout(() => {
          setMsg("");
          setAlert(false);
      }, 2500);
    } else {
      setAlert(true);
      setMsg("Couldn't connect with the server!!");
      setTimeout(() => {
        setAlert(false);
      }, 2500);
    }
  };

  return (
    <>
      <div style={{ height: "70px", marginBottom: "10px" }}>
        <div style={{ visibility: alert ? "visible" : "hidden" }}>
          <Notify variant="danger" msg={msg} />
        </div>
      </div>
      <div className="container mt-5 d-flex justify-content-center">
        <div className="col-md-4"> {/* Makes the form smaller */}
          <h2 className="text-center">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="name"
                value={credentials.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control form-control-sm"
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
            <button type="submit" className="btn btn-primary btn-sm w-100">Signup</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
