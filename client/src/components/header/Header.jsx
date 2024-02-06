// src/components/header/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, styled } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Component = styled(AppBar)`
  background: #2196F3;
`;

const Logo = styled(Typography)`
  cursor: pointer;
  text-decoration: none;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 1.5rem;

  &:hover {
    color: #FFFFFF;
  }
`;

const CustomTypography = styled(Typography)`
  cursor: pointer;
  text-decoration: none;
  color: #FFFFFF;

  &:hover {
    color: #FFFFFF; 
  }
`;

const CustomButton = styled(Button)`
  color: #FFFFFF;
  text-decoration: none;

  &:hover {
    color: #FFFFFF; 
  }
`;

const Header = ({ isAuthenticated, logoutUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <Component position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Logo as={Link} to="/" variant="h6">
          DailyDrive
        </Logo>
        {isAuthenticated && (
          <>
            <div>
              <CustomTypography as={Link} to="/about" variant="h6" sx={{ marginRight: 2 }}>
                ABOUT
              </CustomTypography>
              <CustomTypography as={Link} to="/contact" variant="h6" sx={{ marginRight: 2 }}>
                CONTACT
              </CustomTypography>
            </div>
            <CustomButton onClick={handleLogout} variant="contained">
              LOGOUT
            </CustomButton>
          </>
        )}
        {!isAuthenticated && (
          <CustomButton as={Link} to="/login" variant="contained">
            LOGIN
          </CustomButton>
        )}
      </Toolbar>
    </Component>
  );
};

export default Header;
