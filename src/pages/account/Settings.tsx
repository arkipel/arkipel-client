import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';

const Settings = () => {
  return (
    <Fragment>
      <h1>Settings</h1>
      <h2>Username</h2>
      <ChangeUsernameForm />
      <h2>Email address</h2>
      <p>
        Email addresses are not verified and are only used to reset passwords.
        Make sure it is correctly entered.
      </p>
      <ChangeEmailAddress />
      <h2>Password</h2>
      <ChangePassword />
      <h2>Delete account</h2>
      <p>
        To delete your account, simply stop logging in. Accounts hold no
        personal information except for the email address (which is never
        public) and are deleted after 30 days of inactivity.
      </p>
    </Fragment>
  );
};

const ChangeUsernameForm = () => {
  const { register, handleSubmit } = useForm();

  const setEmailAddress = (formData) => {
    console.log('update username:', formData);
  };

  return (
    <form onSubmit={handleSubmit(setEmailAddress)}>
      <p>
        <input
          type="text"
          placeholder="Username"
          name="username"
          ref={register({
            required: true,
          })}
        />
      </p>
      <p>
        <input type="submit" value="Update" disabled={true} />
      </p>
    </form>
  );
};

const ChangeEmailAddress = () => {
  const { register, handleSubmit } = useForm();

  const setEmailAddress = (formData) => {
    console.log('update username:', formData);
  };

  return (
    <form onSubmit={handleSubmit(setEmailAddress)}>
      <p>
        <input
          type="text"
          placeholder="Email address"
          name="enail_address"
          ref={register({
            required: true,
          })}
        />
      </p>
      <p>
        <input type="submit" value="Update" disabled={true} />
      </p>
    </form>
  );
};

const ChangePassword = () => {
  const { register, handleSubmit } = useForm();

  const setEmailAddress = (formData) => {
    console.log('update username:', formData);
  };

  return (
    <form onSubmit={handleSubmit(setEmailAddress)}>
      <p>
        <input
          type="text"
          placeholder="Password"
          name="password"
          ref={register({
            required: true,
          })}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Password again"
          name="password_again"
          ref={register({
            required: true,
          })}
        />
      </p>
      <p>
        <input type="submit" value="Update" disabled={true} />
      </p>
    </form>
  );
};

export default Settings;
