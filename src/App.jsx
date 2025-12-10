import React from 'react';
import { HashRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import ResumePage from './pages/ResumePage';
import GlobalStyle from './GlobalStyle';
import { lightTheme } from './theme';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <HashRouter>
        <GlobalStyle />
        <AppContainer>
          <Header />
          <MainContent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;

