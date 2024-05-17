import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import Alert from "../common/Alert";
import useAuth from "../hooks/useAuth";

import "./LoginPage.css";

const INITIAL_STATE = {
  username: '',
  password: ''
};


/** Component for the login page.
 *
 * props: none
 *
 * state:
 * - inputValues
 * - errors
 *
 * RouteList -> LoginPage
 */

function LoginPage({ login }) {
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState([]);
  // const { login } = useAuth();
  const navigate = useNavigate();

  /** updates inputValues. */
  function handleChange(evt) {
    setInputValues(inputValues => ({
      ...inputValues,
      [evt.target.name]: evt.target.value
    }));
  }

  /** Calls fn in parent. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(inputValues);
      navigate('/');
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <div className="LoginPage">
      <h1 className="LoginPage-title text-primary mt-5">
        Login
      </h1>

      <div className="LoginPage-Form card border-primary mb-3 mt-5 text-light col-8 col-sm-3">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="w-100">
            <label htmlFor="username" className="LoginPage-label">
              Username
            </label> <br />
            <input
              type="text"
              name="username"
              id="username"
              value={inputValues.username}
              onChange={handleChange}
              className="LoginPage-input form-control"
            /> <br />
            <label htmlFor="password" className="LoginPage-label">
              Password
            </label> <br />
            <input
              type="password"
              name="password"
              id="password"
              value={inputValues.password}
              onChange={handleChange}
              className="LoginPage-input form-control"
            /> <br />

            <p className="text-secondary">Don't have an account?
              <a href="/signup" className="text-primary"> Sign up</a>
            </p>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>

          </form>
        </div>
      </div>
    </div>
  );

}

export default LoginPage;