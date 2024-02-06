import React, { useState, useContext } from 'react';
import { Box, TextField, Button, styled, Typography, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import imageURL from '../DailyDrive.jpg';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.2);
`;

const Image = styled('img')`
  width: 35%;
  margin: auto;
  display: flex;
  padding: 5px 0 0;
`;

const Centre = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > Button {
    margin-top: 20px;
  }
`;

const Para = styled(Typography)`
  text-align: center;
  margin-top: 20px;
  color: #878787;
  font-size: 16px;
`;

const LoginButton = styled(Button)`
    margin-top: 10px; 
    text-transform: none;
    height: 48px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 /0.2);
`;

const SignUpButton = styled(Button)`
    text-transform: none;
    border: none;
    background: #fff;
    color: #2874f0; 
    height: 48px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 /0.4);
`;

const signupInitialValues = {
    name: "",
    email: "",
    password: ""
}

const logInitialValues = {
    email: "",
    password: " "
}

const Login = ({ isUserAuthenticated }) => {
    const [account, toggleAccount] = useState('login');
    const [signUp, setSignUp] = useState(signupInitialValues);
    const [login, setLogin] = useState(logInitialValues);
    const [showPassword, setShowPassword] = useState(false);

    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () => {
        account === 'login' ? toggleAccount('signUp') : toggleAccount('login');
    }

    const onInputChange = (e) => {
        setSignUp({ ...signUp, [e.target.name]: e.target.value });
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const logInUser = async () => {
        try {
            const responsePost = await fetch(`http://localhost:8000/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login),
            });

            if (responsePost.ok || responsePost.status === 201) {
                const responseData = await responsePost.json();

                // console.log("Response Data:", responseData);

                if (responseData.email) {
                    setAccount({ email: responseData.email });
                    console.log("Login successful");
                } else {
                    console.log("Invalid response data or missing email property");
                }

                isUserAuthenticated(true);

                navigate('/');
            } else {
                console.log("User does not exist");
            }
        } catch (error) {
            console.error("Login", error);
        }
    };

    const signUpUser = async () => {
        try {
            // // Fetch users
            const responseGet = await fetch(`http://localhost:8000/auth/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Register a new user
            const responsePost = await fetch(`http://localhost:8000/auth/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUp),
            });

            if (responsePost.ok || responsePost.status === 201) {
                console.log('User created successfully');
            } else {
                console.error('Error creating user');
            }
        } catch (error) {
            console.log("register", error);
        }
    }

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="login" />
                {account === "login" ? (
                    <Centre>
                        <TextField
                            variant="standard"
                            onChange={(e) => onValueChange(e)}
                            label="E-mail"
                            name="email"
                            InputLabelProps={{ style: { color: '#878787' } }}
                        />
                        <TextField
                            variant="standard"
                            onChange={(e) => onValueChange(e)}
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            InputLabelProps={{ style: { color: '#878787' } }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        edge="end"
                                        onClick={togglePasswordVisibility}
                                        sx={{ color: '#878787' }}
                                    >
                                        {showPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                ),
                            }}
                        />
                        <LoginButton variant="contained" onClick={() => logInUser()}>Login</LoginButton>
                        <Para> or </Para>
                        <SignUpButton onClick={() => toggleSignup()}>Create an account</SignUpButton>
                    </Centre>
                ) : (
                    <Centre>
                        <TextField
                            variant="standard"
                            onChange={(e) => onInputChange(e)}
                            name="name"
                            label="Name"
                            InputLabelProps={{ style: { color: '#878787' } }}
                        />
                        <TextField
                            variant="standard"
                            onChange={(e) => onInputChange(e)}
                            name="email"
                            label="E-mail"
                            InputLabelProps={{ style: { color: '#878787' } }}
                        />
                        <TextField
                            variant="standard"
                            onChange={(e) => onInputChange(e)}
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            InputLabelProps={{ style: { color: '#878787' } }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        edge="end"
                                        onClick={togglePasswordVisibility}
                                        sx={{ color: '#878787' }}
                                    >
                                        {showPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                ),
                            }}
                        />

                        <LoginButton onClick={() => signUpUser()} variant="contained">Sign Up</LoginButton>
                        <Para> or </Para>
                        <SignUpButton onClick={() => toggleSignup()}>Already have an account</SignUpButton>
                    </Centre>
                )}
            </Box>
        </Component>
    );
};

export default Login;
