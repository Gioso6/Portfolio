import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  text-align: center;
  padding: 1rem;

  /* Cible tous les liens <a> à l'intérieur du footer */
  a {
    color: white; /* Force la couleur blanche */
    text-decoration: underline; /* Enlève le soulignement (optionnel) */
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter>
      <p>&copy; {currentYear} Designed and Built by Gio SO. <br /> Open Source Code available at <a href="https://github.com/Gioso6/Portfolio" target="_blank" rel="noopener noreferrer">https://github.com/Gioso6/Portfolio</a></p>
    </StyledFooter>
  );
};

export default Footer;