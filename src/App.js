import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import DogDisplay from './components/DogContainer/DogContainer';

const AppContainer = styled.div`
  background-color: #282c34;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

// Generate a unique (enough) ID (without overkill external deps)
const generateID = () => Math.random().toString(16).slice(-6);

// Initial array of dogs for starting the app
const idArray = Array.from({ length: 3 }, () => generateID());

function App() {
  // Interval to add dogs to end of array
  const [dogAddingInterval, setDogAddingInterval] = useState();
  // Interval to remove dogs from start of array
  const [dogRemovingInterval, setDogRemovingInterval] = useState();
  // Array of dogs
  const [dogArray, setDogArray] = useState(idArray);

  useEffect(() => {
    // This starts off the interval which adds new dogs every second
    setDogAddingInterval(
      setInterval(() => setDogArray(
        prevDogArray => prevDogArray.concat([generateID()]),
      ),
      1000),
    );

    // After 40s, start removing dogs that have animated off the end of the screen
    setDogRemovingInterval(
      setTimeout(() => (
        setInterval(() => setDogArray(
          (prevDogArray) => {
            prevDogArray.shift();
            return prevDogArray;
          },
        ),
        1000)
      ), 40000),
    );
  }, []);


  return (
    <AppContainer>
      {
        dogArray.map(uniqueID => (
          <DogDisplay key={uniqueID} />
        ))
      }
    </AppContainer>
  );
}

export default App;
