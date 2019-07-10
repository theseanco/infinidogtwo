import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DogImg = styled.img`
  display: ${props => (props.isLoaded ? 'block' : 'none')};
  max-height: 100%;
  max-width: 100%;
`;

const DogVid = styled.video`
  max-height: 100%;
  max-width: 100%;
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
