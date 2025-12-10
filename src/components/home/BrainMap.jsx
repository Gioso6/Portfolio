import React from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  FaBrain, 
  FaIndustry, 
  FaNetworkWired, 
  FaRobot, 
  FaLaptopCode, 
  FaUsersCog 
} from 'react-icons/fa';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(99, 102, 241, 0); }
  100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  position: relative;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  perspective: 1000px;
`;

const TechCard = styled.div`
  position: relative;
  background: #f8fafc; /* Lighter slate background */
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  padding: 1.5rem;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  
  /* Slightly darker dots */
  background-image: radial-gradient(rgba(99, 102, 241, 0.12) 1px, transparent 1px);
  background-size: 20px 20px;

  &:hover {
    transform: translateY(-8px) rotateX(2deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: #f1f5f9; /* Slightly darker on hover */
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleY(1);
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(241, 245, 249, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  border: 1px solid rgba(255, 255, 255, 0.8);
  
  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.9;
    transition: transform 0.3s ease;
  }

  ${TechCard}:hover & svg {
    transform: scale(1.1) rotate(5deg);
    opacity: 1;
  }
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.muted};
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;

  ${TechCard}:hover & {
    background-color: ${({ theme }) => theme.colors.primary};
    animation: ${pulse} 2s infinite;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.5rem;
`;

const Tag = styled.span`
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  background: rgba(99, 102, 241, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  font-weight: 600;
  opacity: 0.8;

  ${TechCard}:hover & {
    opacity: 1;
    background: rgba(99, 102, 241, 0.15);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
`;

const skills = [
    { 
        id: 'ai', 
        label: 'Artificial Intelligence', 
        Icon: FaBrain, 
        description: 'Design, develop, train and implement State of the Art AI models.',
        tags: ['Deep Learning', 'LLM', 'Computer Vision', 'PyTorch']
    },
    { 
        id: 'automation', 
        label: 'Industrial Automation', 
        Icon: FaIndustry, 
        description: 'Bridging the physical and digital worlds with precision using quality sensors and PLCs.',
        tags: ['PLC', 'OPC UA', 'Modbus', 'Digital Twins']
    },
    { 
        id: 'iot', 
        label: 'Internet of Things', 
        Icon: FaNetworkWired, 
        description: 'Connecting devices to build smart, responsive ecosystems on scalable devices.',
        tags: ['NodeRed', 'Edge Computing', 'IO-Link', 'Cloud']
    },
    { 
        id: 'mechatronics', 
        label: 'Mechatronics', 
        Icon: FaRobot, 
        description: 'Integrating mechanical, electrical, and software engineering.',
        tags: ['Robotics', 'Physics simulation', 'Control Systems', 'ROS']
    },
    { 
        id: 'programming', 
        label: 'Full-Stack Engineering', 
        Icon: FaLaptopCode, 
        description: 'Building robust, scalable applications from scratch.',
        tags: ['Python', 'C++', 'VHDL', 'Docker']
    },
    { 
        id: 'leadership', 
        label: 'Technical Leadership', 
        Icon: FaUsersCog, 
        description: 'Leading projects to deliver complex technical solutions.',
        tags: ['Agile', 'Lean', 'Project Mgmt', 'Collaboration']
    },
];

const BrainMap = () => {
  return (
    <Wrapper>
      <SectionTitle>Technical Expertise</SectionTitle>
      <GridContainer>
        {skills.map((skill, index) => (
          <TechCard key={skill.id} style={{ animationDelay: `${index * 0.1}s` }}>
            <HeaderRow>
              <IconBox>
                <skill.Icon size={24} />
              </IconBox>
              <StatusDot />
            </HeaderRow>
            <Content>
              <Title>{skill.label}</Title>
              <Description>{skill.description}</Description>
              <TagRow>
                {skill.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagRow>
            </Content>
          </TechCard>
        ))}
      </GridContainer>
    </Wrapper>
  );
};

export default BrainMap;