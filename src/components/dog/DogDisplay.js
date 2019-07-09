import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DogImg = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

const DogVid = styled.video`
  max-height: 100%;
  max-width: 100%;
`;

const DogDisplay = () => {
  const [data, setData] = useState({ });

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
    return (<DogImg src={data.url} alt="dog" />);
  }

  return (
    <DogVid src={data.url} alt="dog" autoPlay loop muted />
  );
};

export default DogDisplay;
