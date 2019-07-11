import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

// From MDN, used to randomise dog initial position and animation length
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const fallFromAbove = keyframes`
  from {
    transform: translate3d(0, -300px, 0);
  }

  to {
    // eslint-disable-next-line
    transform: translate3d(0, ${window.innerHeight + 50}px, 0);
  }
`;

const DogImg = styled.img`
  animation: ${fallFromAbove} ${getRndInteger(5, 13)}s linear;
  animation-fill-mode: forwards;
  display: ${props => (props.isLoaded ? 'block' : 'none')};
  height: auto;
  left: ${getRndInteger(0, window.innerWidth - 50)}px;
  max-height: 300px;
  position: absolute;
  top: 0;
  transform-origin: top left;
  width: auto;
`;

const DogDisplay = () => {
  // isLoaded controls image rendering, data takes in JSON from random.dog
  const [data, setData] = useState({ });
  const [isLoaded, setIsLoaded] = useState(false);

  // fetching data using hooks
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://random.dog/woof.json',
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  if (!data.url) {
    return null;
  }

  if (data.url.match(/\.(jpeg|jpg|gif|png|JPG|PNG|JPEG|GIF)$/) !== null) {
    return (<DogImg src={data.url} alt="dog" onLoad={() => setIsLoaded(true)} isLoaded={isLoaded} />);
  }

  return (
    // As polymorphic prop used to prevent styled-components code repetition
    <DogImg as="video" src={data.url} alt="dog" autoPlay loop muted onLoadedData={() => setIsLoaded(true)} isLoaded={isLoaded} />
  );
};

export default DogDisplay;
