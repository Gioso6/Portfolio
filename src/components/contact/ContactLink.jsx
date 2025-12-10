import React from 'react';
import styled from 'styled-components';

const LinkContainer = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.75rem 1rem;
  border-radius: 10px;
  transition: background-color 0.3s, transform 0.25s ease, box-shadow 0.25s ease;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    transform: translateY(-2px);
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.16);
    
    svg {
      color: ${({ theme }) => theme.colors.primary};
      transform: scale(1.1);
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  
  svg {
    transition: all 0.3s ease;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const ContactLink = ({ href, IconComponent, text }) => {
  return (
    <LinkContainer href={href} target="_blank" rel="noopener noreferrer">
      {IconComponent && (
        <IconWrapper>
          <IconComponent size={24} />
        </IconWrapper>
      )}
      <span>{text}</span>
    </LinkContainer>
  );
};

export default ContactLink;
