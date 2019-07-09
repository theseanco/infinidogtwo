import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import DogDisplay from './components/DogContainer/DogContainer';

const AppContainer = styled.div`
  background-color: #282c34;
  display: flex;
  text-align: center;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const AppHeader = styled.header`
  min-height: 100vh;
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
      <DogDisplay />
    </AppContainer>
  );
}

export default App;
