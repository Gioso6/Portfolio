import React from 'react';
import styled from 'styled-components';
import Hero from '../components/home/Hero';
import BrainMap from '../components/home/BrainMap';
import Philosophy from '../components/home/Philosophy';

const MainCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 24px;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.14);
  max-width: 1200px;
  margin: 2rem auto;
  padding: 3rem 2rem;
  width: 94vw;
`;

const Separator = styled.div`
  height: 3px;
  width: 60%;
  background: ${({ theme }) => theme.colors.text};
  opacity: 0.2;
  margin: 1rem auto 3rem;
  border-radius: 2px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 3rem;
`;

const SkillsSection = styled.section`
  padding: 1rem 0 2rem;
  display: flex;
  justify-content: center;
`;

const PhilosophySection = styled.section`
  padding: 1rem 0 2rem;
`;

const HomePage = () => {
  return (
    <MainCard>
      <Hero />
      
      <Separator />
      
      <SkillsSection>
        <BrainMap />
      </SkillsSection>
      
      <Separator />
      
      <PhilosophySection>
        <SectionTitle>My Philosophy</SectionTitle>
        <Philosophy />
      </PhilosophySection>
    </MainCard>
  );
};

export default HomePage;