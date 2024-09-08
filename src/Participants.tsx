import styled from 'styled-components';
import { Section, Button } from './styles';

const ListItem = styled.li`
  padding: 10px;
  margin: 5px;
  background-color: #f9f9f9;
  border-radius: 5px;
  list-style: none;
  color: #282c34;
  font-weight: bold;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1.2rem;
  margin-right: 10px;
  width: 60%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  & > button {
    margin-left: 10px;
  }
`;

export const Participants = () => {
  return (
    <Section>
      <h2>Add Participants</h2>
      <Input type="text" />
      <Button>Add</Button>
      <h2>Participants</h2>
      <ButtonGroup>
        <Button>Shuffle</Button>
        <Button>Sort</Button>
      </ButtonGroup>
      <ul>
        <ListItem>Participant 1</ListItem>
        <ListItem>Participant 2</ListItem>
        <ListItem>Participant 3</ListItem>
      </ul>
    </Section>
  );
};
