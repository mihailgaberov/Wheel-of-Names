import styled from 'styled-components';
import { Section, Button, Input } from './styles';
import { FC, useState } from 'react';

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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  & > button {
    margin-left: 10px;
  }
`;

interface ParticipantsProps {
  handleAddName: (name: string) => void;
}

export const Participants: FC<ParticipantsProps> = ({ handleAddName }) => {
  const [participant, setParticipant] = useState('');

  return (
    <Section>
      <h2>Add Participants</h2>
      <Input
        type="text"
        value={participant}
        onChange={(e) => setParticipant(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            handleAddName(participant);
          }
        }}
      />
      <Button onClick={() => handleAddName(participant)}>Add</Button>
      <h2>Participants</h2>
      <ButtonGroup>
        <Button>Shuffle</Button>
        <Button>Sort</Button>
      </ButtonGroup>
      <ul>
        <ListItem>Mihail</ListItem>
        <ListItem>Xavi</ListItem>
        <ListItem>Alejandro</ListItem>
      </ul>
    </Section>
  );
};
