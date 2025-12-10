import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  animation: ${fadeIn} 1s ease-in-out;
  background: transparent;
  padding: 2rem 0;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 2rem;
  max-width: 760px;
`;

const Text = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 2rem;
  max-width: 760px;
`;

const ActionsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 680px;
`;

const CTAButton = styled.a`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.9rem 1.25rem;
  border-radius: 12px;
  text-decoration: none;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  box-shadow: 0 12px 28px rgba(99, 102, 241, 0.3);
  text-align: center;
  font-weight: 700;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    filter: brightness(1.1);
    transform: translateY(-2px);
    box-shadow: 0 16px 36px rgba(99, 102, 241, 0.4);
  }
`;

const Hero = () => {
  return (
    <HeroContainer>
      <Title>Hello there ! <br /> 
            Welcome to my portfolio !
      </Title>
      <Subtitle>My name is Gio. <br />
            I am an engineer that recently graduated. <br />
            I specialize in industrial AI application !
      </Subtitle>
      <Text>
        Discover more about me, my interests, my goals as well as my beliefs. <br />
        If you are interested, might aswell take a look at my past professional experience, conducted and on-going projects !
      </Text>
      <ActionsRow>
        <CTAButton href="/projects">See my work</CTAButton>
        <CTAButton href="/about">Know me more</CTAButton>
        <CTAButton href="/resume">View my resume</CTAButton>
      </ActionsRow>
    </HeroContainer>
  );
};

export default Hero;
