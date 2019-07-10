import React from 'react';
import styled, { keyframes } from 'styled-components';
import Dog from '../dog/DogDisplay';

const fallFromAbove = keyframes`
  from {
    transform: translateY(-50%);
  }

  to {
    transform: translateY(150%);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const DogContainerDiv = styled.div`
  animation: ${rotate} 6s linear infinite;
  max-height: 30%;
  max-width: 30%;
`;

const DogContainer = () => (
  <DogContainerDiv>
    <Dog />
  </DogContainerDiv>
);

export default DogContainer;
