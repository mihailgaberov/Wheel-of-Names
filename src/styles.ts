import styled from 'styled-components';

export const Section = styled.section`
  width: 40%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  padding: 1rem;
  margin: 0.5rem;
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  padding: 0.8rem;
  font-size: 1.2rem;
  margin: 0.5rem;
  width: 60%;
`;

export const EditableWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  justify-content: center;

  &:hover {
    background-color: #f0f0f0;
    color: black;
  }

  h1 {
    margin: 0;
    padding-right: 10px;
  }
`;

export const EditIcon = styled.div`
  font-size: 20px;
  color: gray;
  margin-left: 8px;
  opacity: 0.8;

  ${EditableWrapper}:hover & {
    color: black;
  }
`;
