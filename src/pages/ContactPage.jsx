import React from 'react';
import styled from 'styled-components';
import ContactForm from '../components/contact/ContactForm';

const ContactContainer = styled.div`
  padding: 4rem 2rem;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.14);
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 22px;
  max-width: 1100px;
  margin: 2.5rem auto 3rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 3rem;
`;

const ContactPage = () => {
  return (
    <ContactContainer>
      <SectionTitle>Contact Me</SectionTitle>
      <ContactForm />
    </ContactContainer>
  );
};

export default ContactPage;
