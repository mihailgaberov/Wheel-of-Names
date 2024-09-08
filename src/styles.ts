import styled from 'styled-components';

export const Section = styled.section`
  width: 40%;
`;

export const Button = styled.button`
  padding: 1rem;
  background-color: #282c34;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;

  // hover effect
  &:hover {
    background-color: #61dafb;
  }
`;
