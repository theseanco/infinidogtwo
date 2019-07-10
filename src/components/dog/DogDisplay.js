import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const fallFromAbove = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    // eslint-disable-next-line
    transform: translate3d(0, ${window.innerHeight + 50}px, 0);
  }
`;

const DogImg = styled.img`
  animation: ${fallFromAbove} 5s linear;
  animation-fill-mode: forwards;
  display: ${props => (props.isLoaded ? 'block' : 'none')};
  height: 30%;
  max-height: 100%;
  max-width: 100%;
  position: absolute;
  top: 0;
  transform-origin: top left;
  width: 30%;
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
