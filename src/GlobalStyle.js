import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: ${({ theme }) => (theme.mode === 'dark' ? 'dark' : 'light')};
  }

  body {
    margin: 0;
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'radial-gradient(circle at 10% 20%, #0f1a2b, #05070e 45%)'
        : 'linear-gradient(135deg, #edf2f7 0%, #f8fafc 60%, #eef2f6 100%)'};
    color: ${({ theme }) => theme.colors.text};
    transition: background 0.4s ease, color 0.4s ease;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

export default GlobalStyle;
