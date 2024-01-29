import { useState } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import imageURL from '../DailyDrive.jpg';

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.2);
`;

const Image = styled('img')({
    backgroundColor: '#fff',
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '10px 0 0',
});

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
    margin-top: 10px; // Fix: Change marginTop to margin-top
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

const Login = () => {
    const [account, toggleAccount] = useState('login');
    const [signUp, setSignUp] = useState(signupInitialValues);

    const toggleSignup = () => {
        account === 'login' ? toggleAccount('signUp') : toggleAccount('login');
    }

    const onInputChange = (e) => {
        setSignUp({ ...signUp, [e.target.name]: e.target.value });

        // console.log(e.target.name, e.target.value);
    }

    const signUpUser = async () => {
        console.log(signUp);

        try {
            // Fetch users
            const responseGet = await fetch(`http://localhost:8000/auth/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Register a new user
            // Register a new user
            const responsePost = await fetch(`http://localhost:8000/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signUp),
            });

            console.log(responsePost);

        } catch (error) {
            console.log("register", error);
        }
    }

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="login" />
                {
                    account === "login" ?
                        <Centre>
                            <TextField variant="standard" label="E-mail" InputLabelProps={{ style: { color: '#878787' } }} />
                            <TextField variant="standard" label="Password" InputLabelProps={{ style: { color: '#878787' } }} />
                            <LoginButton variant="contained">Login</LoginButton>
                            <Para> or </Para>
                            <SignUpButton onClick={() => toggleSignup()}>Create an account</SignUpButton>
                        </Centre>
                        :
                        <Centre>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name="name" label="Name" InputLabelProps={{ style: { color: '#878787' } }} />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name="email" label="E-mail" InputLabelProps={{ style: { color: '#878787' } }} />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name="password" label="Password" InputLabelProps={{ style: { color: '#878787' } }} />

                            <LoginButton onClick={() => signUpUser()} variant="contained">Sign Up</LoginButton>
                            <Para> or </Para>
                            <SignUpButton onClick={() => toggleSignup()}>Already have an account</SignUpButton>
                        </Centre>
                }
            </Box>
        </Component>
    );
};

export default Login;
