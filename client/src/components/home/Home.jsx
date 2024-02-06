// src/components/home/Home.jsx
import React from 'react';
import { Container, Typography, styled } from '@mui/material';

const Section = styled('section')`
  margin: 20px 0;
  text-align: center;
`;

const Image = styled('img')`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 20px 0;
`;

const HomePage = () => {
  return (
    <Container>
      <Section>
        <Typography variant="h2" gutterBottom>
          Welcome to DailyDrive!
        </Typography>
        <Typography variant="body1">
          Explore our platform and enjoy a seamless experience.
        </Typography>
      </Section>

      <Section>
        <Image
          src="https://your-image-url.com/your-image.jpg"
          alt="DailyDrive Image"
        />
      </Section>

      <Section>
        <Typography variant="h4" gutterBottom>
          Features
        </Typography>
        <ul>
          <li>Discover amazing content</li>
          <li>Personalized recommendations</li>
          <li>Easy navigation</li>
        </ul>
      </Section>

      <Section>
        <Typography variant="h4" gutterBottom>
          Get Started
        </Typography>
        <Typography variant="body1">
          Create an account or log in to access premium features.
        </Typography>
      </Section>

      <Section>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">
          Have questions? Reach out to us at support@dailydrive.com.
        </Typography>
      </Section>
    </Container>
  );
};

export default HomePage;
