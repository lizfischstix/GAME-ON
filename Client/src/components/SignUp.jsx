import React, { useState, useEffect } from 'react';
import { Button, TextField, Alert } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignUp = () => {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <form noValidate onSubmit={handleFormSubmit}>
        <Alert
          severity="error"
          onClose={() => setShowAlert(false)}
          sx={{ marginBottom: 2, display: showAlert ? 'block' : 'none' }}
        >
          Something went wrong with your signup!
        </Alert>
        <TextField
          fullWidth
          margin="normal"
          id="username"
          label="Username"
          type="text"
          variant="outlined"
          value={userFormData.username}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          value={userFormData.email}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={userFormData.password}
          onChange={handleInputChange}
          required
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="success"
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default SignUp;
