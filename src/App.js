import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import logo from './logo.svg';
import swallo from './swallo.svg';
import './App.css';

const AppContainer = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AppLogo = styled.img`
  animation: ${logoSpin} ${props => props.spinTime || '5s'} linear infinite;
  height: 40vmin;
  pointer-events: none;
`;

function App() {
  return (
    <AppContainer>
      <AppHeader>
        <AppLogo src={logo} alt="logo" spinTime="30s" />
        <p>
          Spinning cat
        </p>
        <AppLogo src={swallo} alt="logo" spinTime="20s" />
        <p>
          Spinning Bird
        </p>
      </AppHeader>
    </AppContainer>
  );
}

export default App;
