import React from 'react';
import styled from 'styled-components';
import { FaChartArea, FaShieldAlt, FaMicrochip } from 'react-icons/fa';

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  margin: 0 auto;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  /* Subtle accent line at top */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
    border-color: transparent;
    
    &::after {
      opacity: 1;
    }
    
    /* Icon animation */
    svg {
      transform: scale(1.1);
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(99, 102, 241, 0.1); /* Primary color tint */
  border-radius: 12px;
  margin-bottom: 1.5rem;
  
  svg {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Description = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`;

const principles = [
  {
    id: 1,
    title: 'Helpful',
    description: `My experience as a fast-food worker and an intern operator, allowed me 
                to experience what operators suffer everyday. Their tasks are tedious, 
                and suffer from both the environment and physical limtations.`,
    icon: FaChartArea
  },
  {
    id: 2,
    title: 'Innovative',
    description: `Through different projects and experiences in industrial domains, my 
                skills progressed more towards innovation : optimization of industrial 
                processes through artificial intelligence — industry 4.0 / 5.0`,
    icon: FaShieldAlt
  },
  {
    id: 3,
    title: 'Optimized',
    description: `From my perspective, many production lines are still dependent on human 
                subjective decision-making. They are not optimized both in terms of material 
                and energy consumption. Our AI could increase production capabilities aswell 
                as reduce waste !`,
    icon: FaMicrochip
  }
];

const Philosophy = () => {
  return (
    <Container>
      {principles.map((item) => (
        <Card key={item.id}>
          <IconWrapper>
            <item.icon />
          </IconWrapper>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
        </Card>
      ))}
    </Container>
  );
};

export default Philosophy;