import React from 'react';
import styled from 'styled-components/macro';
import Dog from '../dog/DogDisplay';

const DogContainerDiv = styled.div`
  max-height: 30%;
  max-width: 30%;
`;

const DogContainer = () => (
  <DogContainerDiv>
    <Dog />
  </DogContainerDiv>
);

export default DogContainer;
