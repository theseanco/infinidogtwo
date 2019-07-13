import React from 'react';
import styled from 'styled-components/macro';
import DogDisplay from './components/DogContainer/DogContainer';

const AppContainer = styled.div`
  background-color: #282c34;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const generateID = () => Math.random().toString(16).slice(-6);

const idArray = Array.from({ length: 10 }, () => generateID());

function App() {
  return (
    <AppContainer>
      {
        idArray.map((uniqueID, index) => (
          <DogDisplay key={uniqueID} />
        ))
      }
    </AppContainer>
  );
}

export default App;
