import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

const AuthPage = () => {
  const message = useMessage();
  const auth = useContext(AuthContext);
  const { request, loading, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("api/auth/register", "POST", { ...form });
      message(data.message);
    } catch {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Auth</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              onClick={loginHandler}
              disabled={loading}
            >
              Sign In
            </button>
            <button
              className="btn grey lighten-4 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
