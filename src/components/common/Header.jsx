import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0;
  width: 100%;
  background: rgba(226, 232, 240, 0.98); /* Slightly darker light grey, high opacity */
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0 0 24px 24px; /* Rounded bottom corners only */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04); /* More subtle shadow */
  backdrop-filter: blur(12px);
`;

const HeaderContent = styled.div`
  max-width: 1280px; /* Constrain content width */
  margin: 0 auto; /* Center content */
  padding: 1rem 2rem; /* Inner padding */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: #1e293b; /* Dark text for logo */
  pointer-events: ${({ active }) => (active ? 'none' : 'auto')};
  transition: color 0.25s ease;
  display: inline-flex;
  font-weight: bold;
  font-size: 1.5rem;
  align-items: center;
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinkItem = styled(Link)`
  color: ${({ active, highlight, theme }) => 
    highlight 
      ? theme.colors.primary 
      : active 
        ? theme.colors.primary 
        : '#475569'};
  text-decoration: none;
  font-size: 1rem;
  font-weight: ${({ highlight }) => (highlight ? '600' : '500')};
  position: relative;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  background: ${({ active, highlight, theme }) =>
    highlight
      ? 'transparent'
      : active 
        ? 'rgba(99, 102, 241, 0.1)' 
        : 'transparent'};
  border: ${({ highlight, theme }) => 
    highlight ? `1px solid ${theme.colors.primary}` : '1px solid transparent'};
  
  &:hover {
    color: ${({ theme }) => theme.colors.surface};
    background: ${({ highlight, theme }) => 
      highlight ? theme.colors.primary : 'rgba(99, 102, 241, 0.05)'};
    border-color: ${({ theme, highlight }) => highlight ? theme.colors.primary : 'transparent'};
    
    /* If it's not the highlighted button, keep text color as primary on hover */
    ${({ highlight, theme }) => !highlight && `
      color: ${theme.colors.primary};
    `}
  }
`;

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Resume', to: '/resume' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact', highlight: true },
];

const MenuButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: inline-flex;
  }
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  color: #1e293b;
`;

const Burger = styled.span`
  position: relative;
  display: block;
  width: 24px;
  height: 2px;
  background: #1e293b;
  transition: transform 0.2s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 24px;
    height: 2px;
    background: #1e293b;
    transition: transform 0.2s ease, top 0.2s ease;
  }

  &::before {
    top: -8px;
  }

  &::after {
    top: 8px;
  }
`;

const MobileMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: ${({ open }) => (open ? 'flex' : 'none')};
  }
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.98);
  padding: 100px 0 20px;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 2000;
  overflow-y: auto;
`;

const MobileNavLink = styled(Link)`
  color: ${({ active, theme }) => (active ? theme.colors.primary : '#1e293b')};
  text-decoration: none;
  font-size: 1.25rem;
  padding: 0.75rem 1.5rem;
  text-align: center;
  font-weight: 600;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <HeaderWrapper>
      <HeaderContent>
        <LogoLink to="/" active={location.pathname === '/'}>
          <Logo />
        </LogoLink>
        <Nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLinkItem 
                  to={link.to} 
                  active={location.pathname === link.to}
                  highlight={link.highlight}
                >
                  {link.label}
                </NavLinkItem>
              </li>
            ))}
          </ul>
        </Nav>
        <MenuButton aria-label="Ouvrir le menu" onClick={handleToggle}>
          <Burger />
        </MenuButton>
        <MobileMenu open={open}>
          {navLinks.map((link) => (
            <MobileNavLink
              key={link.to}
              to={link.to}
              active={location.pathname === link.to}
              onClick={closeMenu}
            >
              {link.label}
            </MobileNavLink>
          ))}
        </MobileMenu>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
