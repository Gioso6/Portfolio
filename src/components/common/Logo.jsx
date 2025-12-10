import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  /* Removed heavy background/border/shadow for a cleaner look on light header */
`;

const FirstName = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const LastName = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const Logo = ({ className }) => {
  return (
    <LogoContainer className={className}>
      <FirstName>Gio&apos;s</FirstName>
      <LastName>Portfolio</LastName>
    </LogoContainer>
  );
};

export default Logo;
