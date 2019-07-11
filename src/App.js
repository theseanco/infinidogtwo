import React from 'react';
import styled from 'styled-components/macro';
import DogDisplay from './components/DogContainer/DogContainer';

const AppContainer = styled.div`
  background-color: #282c34;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

function App() {
  return (
    <AppContainer>
      <DogDisplay />
    </AppContainer>
  );
}

export default App;
