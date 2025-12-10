import React from 'react';
import styled from 'styled-components';
import AboutMe from '../components/about/AboutMe';

const AboutContainer = styled.div`
  padding: 4rem 2rem;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.14);
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 22px;
  max-width: 1200px;
  margin: 2.5rem auto 3rem;
`;

const AboutPage = () => {
  return (
    <AboutContainer>
      <AboutMe />
    </AboutContainer>
  );
};

export default AboutPage;
