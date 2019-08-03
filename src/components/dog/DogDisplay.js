import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import axios from 'axios';

// From MDN, used to randomise dog initial position and animation length
const getRndInteger = (min, max) => (
  Math.floor(Math.random() * (max - min + 1)) + min
);

// Two animations, used for media queries. Hardware accelerated.
const fallFromAbove = keyframes`
  from {
    transform: translate3d(0, -600px, 0);
  }

  to {
    transform: translate3d(0, 100vh, 0);
  }
`;

const scrollFromLeft = keyframes`
  from {
    transform: translate3d(-600px, 0, 0);
  }

  to {
    transform: translate3d(100vw, 0, 0);
  }
`;

const DogImg = styled.img`
  animation: ${fallFromAbove} ${props => props.animLength || 7}s linear;
  animation-fill-mode: forwards;
  animation-play-state: ${props => (props.isReady ? 'running' : 'paused')};
  display: ${props => (props.isLoaded ? 'block' : 'none')};
  height: auto;
  left: ${props => props.offset || 0}vw;
  max-height: 300px;
  position: absolute;
  top: 0;
  transform-origin: top left;
  width: auto;
  
  // for big screens go from left to right (mobile first)
  @media screen and (min-width: 1025px) {
    animation: ${scrollFromLeft} ${props => props.animLength || 7}s linear;
    animation-fill-mode: forwards;
    animation-play-state: ${props => (props.isReady ? 'running' : 'paused')};
    left: 0;
    top: ${props => props.offset || 0}vh;
    transform-origin: top right;
  }
`;

const DogDisplay = () => {
  // isLoaded controls image rendering, data takes in JSON from random.dog
  const [data, setData] = useState({ });
  const [randomPos, setRandomPos] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [animLength, setAnimLength] = useState(7);

  // fetching data using hooks
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://random.dog/woof.json',
      );

      setData(result.data);
    };
    // Set the random position that will be used to offset left or top
    setRandomPos(getRndInteger(0, 80));
    setAnimLength(getRndInteger(7, 17));

    fetchData();
  }, []);

  // If the fetch hasn't completed yet, don't return anything.
  if (!data.url) {
    return null;
  }

  // If it's an image, render an image
  if (data.url.match(/\.(jpeg|jpg|gif|png|JPG|PNG|JPEG|GIF)$/) !== null) {
    return (
      <DogImg
        src={data.url}
        alt="dog"
        onLoad={() => setIsLoaded(true)}
        isLoaded={isLoaded}
        isReady
        offset={randomPos}
        animLength={animLength}
      />
    );
  }

  return (
    // If it's a video we need a whole different set of props.
    // was going to use cloneElement, but this code is fairly DRY
    // As polymorphic prop used to prevent styled-components code repetition
    <DogImg
      as="video"
      src={data.url}
      alt="dog"
      autoPlay
      loop
      muted
      onLoadedData={() => setIsLoaded(true)}
      onCanPlay={() => setVideoLoaded(true)}
      isLoaded={isLoaded}
      isReady={videoLoaded}
      offset={randomPos}
      animLength={animLength}
    />
  );
};

export default DogDisplay;
