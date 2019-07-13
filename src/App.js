import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import DogDisplay from './components/DogContainer/DogContainer';

const AppContainer = styled.div`
  background-color: #282c34;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const generateID = () => Math.random().toString(16).slice(-6);

// test array
const idArray = Array.from({ length: 10 }, () => generateID());

const newIDArray = [generateID()];

setInterval(() => { newIDArray.push(generateID()); }, 4000);

function App() {
  const [dogInterval, setDogInterval] = useState();
  const [dogArray, setDogArray] = useState([]);

  // This makes the code work, but i don't really know why.
  useEffect(() => {
    setDogInterval(setInterval(() => { setDogArray([...dogArray, generateID()]); }, 5000));
  }, []);

  return (
    <AppContainer>
      {
        newIDArray.map((uniqueID, index) => (
          <DogDisplay key={uniqueID} />
        ))
      }
    </AppContainer>
  );
}

export default App;
