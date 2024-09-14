import styled from 'styled-components';
import { Section, Button, Input } from './styles';
import { FC, useState } from 'react';

import { MAX_SECTORS } from './Wheel';

const ListItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ListItem = styled.li`
  width: 100%;
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

const ErrorMessage = styled.p`
  color: red;
`;

interface ParticipantsProps {
  handleAddName: (name: string) => void;
  handleRemoveName: (index: number) => void;
  names: string[];
}

export const Participants: FC<ParticipantsProps> = ({
  handleAddName,
  handleRemoveName,
  names,
}) => {
  const [participant, setParticipant] = useState('');

  const isMaxParticipantsReached = names.length >= MAX_SECTORS;

  return (
    <Section>
      <h2>Add Participants</h2>
      <Input
        disabled={isMaxParticipantsReached}
        type="text"
        value={participant}
        onChange={(e) => setParticipant(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            handleAddName(participant);
            setParticipant('');
          }
        }}
      />
      {isMaxParticipantsReached && (
        <ErrorMessage>Max participants reached.</ErrorMessage>
      )}
      <Button
        disabled={isMaxParticipantsReached}
        onClick={() => {
          handleAddName(participant);
          setParticipant('');
        }}
      >
        Add
      </Button>
      <h2>Participants</h2>
      <ButtonGroup>
        <Button>Shuffle</Button>
        <Button>Sort</Button>
      </ButtonGroup>
      <ul>
        {names.map((name, index) => (
          <ListItemContainer key={index}>
            <ListItem>{name}</ListItem>
            <Button onClick={() => handleRemoveName(index)}>Del</Button>
          </ListItemContainer>
        ))}
      </ul>
    </Section>
  );
};
