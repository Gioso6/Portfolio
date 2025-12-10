import React from 'react';
import styled from 'styled-components';

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 2rem 0;
  padding-left: 10px;
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: 4rem; /* Space for the line to extend */
  padding-left: 30px; /* Reduced padding for smaller dot */
  
  /* The vertical line */
  &::before {
    content: '';
    position: absolute;
    left: 2px; /* Center the line relative to the 8px dot (8/2 - 4/2 = 2) */
    top: 16px; /* Start below the dot */
    bottom: 8px; /* Stop 8px before the next item starts */
    width: 4px; 
    background: #000000;
    border-radius: 4px;
  }

  /* Ensure the last item has a line extending downwards */
  &:last-child::before {
    bottom: -2rem; /* Extend past the content */
    background: linear-gradient(to bottom, #000000 80%, transparent); 
  }
`;

const Dot = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #000000; /* Simple black dot */
  z-index: 1;
`;

const DateText = styled.span`
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
  background: rgba(99, 102, 241, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
`;

const DegreeTitle = styled.h3`
  margin: 0 0 0.75rem 0;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Description = styled.p`
  margin: 0 0 0.75rem 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  max-width: 800px;
`;

const Ranking = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BrochureButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Education = () => {
  return (
    <TimelineContainer>
      <TimelineItem>
        <Dot />
        <DateText>2023 - 2025</DateText>
        <DegreeTitle>Master's Degree in Mechatronics, Energy and Intelligent Systems</DegreeTitle>
        <Description>
          This program trains high-level engineers and researchers at the intersection of mechatronics, energy, and Artificial Intelligence. 
          Combining engineering sciences with computer science, the curriculum focuses on Industry 4.0, embedded systems, energy management, 
          and applied AI, providing highly sought-after skills for the modern industrial sector.
        </Description>
        <Ranking>
          Ranking: <span>Valedictorian (1st / 17)</span>
        </Ranking>
        <BrochureButton href="https://physique-ingenierie.unistra.fr/formations/masters/physique-appliquee-et-ingenierie-physique/mecatronique-energie-et-systemes-intelligents-mesi/" target="_blank">
           Master's Brochure
        </BrochureButton>
      </TimelineItem>

      <TimelineItem>
        <Dot />
        <DateText>2020 - 2023</DateText>
        <DegreeTitle>Bachelor’s degree in Applied Physics and Engineering Science</DegreeTitle>
        <Description>
          This multidisciplinary program provides a robust foundation in engineering sciences, mathematics, and physics. Through a progressive 
          specialization structure, it covers key disciplines including Electronics, Mechanics, and Mechatronics. The curriculum combines 
          theoretical rigor with practical application via project-based learning and industrial internships, developing essential skills in 
          system modeling, design, and technical problem-solving.
        </Description>
        <Ranking>
          Ranking: <span>Top 10%</span>
        </Ranking>
        <BrochureButton href="https://physique-ingenierie.unistra.fr/formations/licences/licence-sciences-pour-lingenieur/?tab=presentation" target="_blank">
           Bachelor's Brochure
        </BrochureButton>
      </TimelineItem>
    </TimelineContainer>
  );
};

export default Education;