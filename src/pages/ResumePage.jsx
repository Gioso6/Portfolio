import React from 'react';
import styled from 'styled-components';

const ResumeContainer = styled.div`
  max-width: 1200px;
  margin: 2.5rem auto 3rem;
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 22px;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.14);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const DownloadButton = styled.a`
  background: ${({ theme }) => theme.colors.primary};
  color: #0f172a;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.2);
  }
`;

const Frame = styled.div`
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.06);
  min-height: 70vh;
  background: #0f172a;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 80vh;
  border: none;
  background: ${({ theme }) => theme.colors.surface};
`;

const ResumePage = () => {
  return (
    <ResumeContainer>
      <Header>
        <Title>Resume</Title>
        <DownloadButton href="/Gio-SO_Resume.pdf" download>
          Download PDF
        </DownloadButton>
      </Header>
      <Frame>
        <Iframe src="/Gio-SO_Resume.pdf" title="Gio-SO_Resume" aria-label="Resume PDF" type="application/pdf">
          <p style={{ padding: '1rem', color: '#e2e8f0' }}>
            Your browser cannot display the PDF. <a href="/Gio-SO_Resume.pdf">Download it here.</a>
          </p>
        </Iframe>
      </Frame>
    </ResumeContainer>
  );
};

export default ResumePage;
