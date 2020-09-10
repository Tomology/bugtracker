import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  // Form Data State, Destructuring and Event Handling
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    password2: "",
  });

  const { email, firstName, lastName, password, password2 } = formData;

  const onChange = (e) => {
    // Remove validation error(s) when field is changed
    if (e.target.name === "email" && invalidEmail === true) {
      setInvalidEmail(false);
    }

    if (e.target.name === "firstName" && invalidFirstName === true) {
      setInvalidFirstName(false);
    }

    if (e.target.name === "lastName" && invalidLastName === true) {
      setInvalidLastName(false);
    }

    if (
      e.target.name === "password" &&
      e.target.value.length >= 6 &&
      invalidPassword === true
    ) {
      setInvalidPassword(false);
    }

    if (e.target.name === "password2" && invalidPassword2 === true) {
      setInvalidPassword2(false);
    }

    if (
      e.target.name === "password2" &&
      passwordMatch === true &&
      password === password2
    ) {
      setPasswordMatch(false);
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Validation States
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidFirstName, setInvalidFirstName] = useState(false);
  const [invalidLastName, setInvalidLastName] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidPassword2, setInvalidPassword2] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  // Handle Form Submit
  const onSubmit = async (e) => {
    e.preventDefault();

    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegEx.test(email) === false) {
      setInvalidEmail(true);
    }

    if (!firstName) {
      setInvalidFirstName(true);
    }

    if (!lastName) {
      setInvalidLastName(true);
    }

    if (!password || password.length < 6) {
      setInvalidPassword(true);
    }

    if (!password2) {
      setInvalidPassword2(true);
    }

    if (
      password.length >= 6 &&
      password2.length > 0 &&
      password !== password2
    ) {
      setPasswordMatch(true);
    }

    register({ firstName, lastName, email, password });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="auth__register"
      id="auth__register"
    >
      <p className="auth__register--lead heading__secondary">
        Create Your Account
      </p>
      <label className="auth__register--email-label">
        Email <span className="u-warning-text">*</span>
      </label>
      <input
        className="auth__register--email-input form__input"
        type="text"
        name="email"
        value={email}
        onChange={(e) => onChange(e)}
      />

      {invalidEmail && (
        <span className="auth__register--email-validation">
          Please use a valid e-mail
        </span>
      )}

      <label className="auth__register--firstName-label">
        First name <span className="u-warning-text">*</span>
      </label>
      <input
        className="auth__register--firstName-input form__input"
        type="text"
        name="firstName"
        value={firstName}
        onChange={(e) => onChange(e)}
      />
      {invalidFirstName && (
        <span className="auth__register--firstName-validation">
          First name is required
        </span>
      )}
      <label className="auth__register--lastName-label">
        Last name <span className="u-warning-text">*</span>
      </label>
      <input
        className="auth__register--lastName-input form__input"
        type="text"
        name="lastName"
        value={lastName}
        onChange={(e) => onChange(e)}
      />
      {invalidLastName && (
        <span className="auth__register--lastName-validation">
          Last name is required
        </span>
      )}

      <label className="auth__register--password-label">
        Password <span className="u-warning-text">*</span>
      </label>
      <input
        className="auth__register--password-input form__input"
        type="password"
        name="password"
        value={password}
        onChange={(e) => onChange(e)}
      />
      {invalidPassword && (
        <span className="auth__register--password-validation">
          Please enter a password with 6 or more characters
        </span>
      )}

      <label className="auth__register--password2-label">
        Confirm Password <span className="u-warning-text">*</span>
      </label>
      <input
        className="auth__register--password2-input form__input"
        type="password"
        name="password2"
        value={password2}
        onChange={(e) => onChange(e)}
      />
      {invalidPassword2 && (
        <span className="auth__register--password2-validation">
          Please confirm your password
        </span>
      )}
      {passwordMatch && (
        <span className="auth__register--passwords-validation">
          Passwords do not match
        </span>
      )}
      <input
        type="submit"
        value="REGISTER"
        className="auth__register--submit btn btn-green u-margin-top-small"
      />
    </form>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
