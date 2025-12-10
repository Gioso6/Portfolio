import React from 'react';
import styled from 'styled-components';
import ContactLink from './ContactLink';
import { 
  FaLinkedin, 
  FaInstagram, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

const ContactInfoContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
`;

const contactLinks = [
  {
    href: 'https://www.linkedin.com/in/gio-so/',
    IconComponent: FaLinkedin,
    text: 'LinkedIn',
  },
  {
    href: 'https://www.instagram.com/gio_so6/',
    IconComponent: FaInstagram,
    text: 'Instagram',
  },
  {
    href: 'mailto:gioso67000@gmail.com',
    IconComponent: FaEnvelope,
    text: 'gioso67000@gmail.com',
  },
  {
    href: 'tel:+33 7 63 74 67 73',
    IconComponent: FaPhone,
    text: '+33 7 63 74 67 73',
  },
  {
    href: 'https://www.google.com/maps/place/Strasbourg,+France',
    IconComponent: FaMapMarkerAlt,
    text: 'Strasbourg, France',
  },
];

const ContactForm = () => {
  return (
    <ContactInfoContainer>
      {contactLinks.map((link, index) => (
        <ContactLink
          key={index}
          href={link.href}
          IconComponent={link.IconComponent}
          text={link.text}
        />
      ))}
    </ContactInfoContainer>
  );
};

export default ContactForm;
