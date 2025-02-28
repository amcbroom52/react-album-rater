import { useState } from "react";
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import Alert from "../common/Alert";
import "./SignupPage.css";

const INITIAL_STATE = {
  username: "",
  firstName: "",
  lastName: "",
  password: "",
};

/** Component for the login page.
 *
 * props: signup()
 *
 * state:
 * - inputValues
 * - errors
 *
 * RouteList -> SignupPage -> Alert
 */

function SignupPage({ signup }) {
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState([]);

  /** updates inputValues. */
  function handleChange(evt) {
    setInputValues((inputValues) => ({
      ...inputValues,
      [evt.target.name]: evt.target.value,
    }));
  }

  /** Calls fn in parent. */
  async function handleSubmit(evt) {
    evt.preventDefault();

    if (inputValues.password.length < 6) {
      setErrors(["Invalid password."]);
      return;
    }

    try {
      await signup(inputValues);
    } catch (err) {
      console.log("ERRORS:", err);
      setErrors(err);
    }
  }

  return (
    <div className="SignupPage">

      <div className="LoginPage-alert">
        {errors.map(err => <Alert type="danger" text={err} key={uuid()} />)}
      </div>

      <h1 className="SignupPage-title text-primary mt-5">
        Signup
      </h1>

      <div className="SignupPage-form card border-primary mb-3 mt-5 text-light col-8 col-sm-3">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="w-100">
            <label htmlFor="username" className="SignupPage-label">
              Username
            </label> <br />
            <input
              type="text"
              name="username"
              id="username"
              value={inputValues.username}
              onChange={handleChange}
              className="SignupPage-input form-control"
            /> <br />
            <label htmlFor="firstName" className="SignupPage-label">
              First Name
            </label> <br />
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={inputValues.firstName}
              onChange={handleChange}
              className="SignupPage-input form-control"
            /> <br />
            <label htmlFor="lastName" className="SignupPage-label">
              Last Name
            </label> <br />
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={inputValues.lastName}
              onChange={handleChange}
              className="SignupPage-input form-control"
            /> <br />
            <label htmlFor="password" className="SignupPage-label">
              Password
            </label> <br />
            <input
              type="password"
              name="password"
              id="password"
              value={inputValues.password}
              onChange={handleChange}
              className="SignupPage-input form-control"
            /> <br />

            <p className="text-secondary">Already have an account? <Link
              to="/login" className="text-primary">
              Login
            </Link>
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

export default SignupPage;