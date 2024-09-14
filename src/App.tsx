import styled from 'styled-components';
import { atom, useAtom, Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';

import { Participants } from './Participants';
import { MAX_SECTORS, Wheel } from './Wheel';
import { Question } from './Questsion';

import './App.css';
import { useState } from 'react';

const Header = styled.header`
  background-color: #282c34;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Main = styled.main`
  display: flex;
  justify-content: space-around;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const namesAtom = atom<string[]>([]);

function App() {
  const [names, setNames] = useAtom<string[]>(namesAtom);

  const handleAddName = (name: string) => {
    if (names.length < MAX_SECTORS) {
      setNames([...names, name]);
    }

    console.log('>>> names: ', names);
  };

  return (
    <Provider>
      <DevTools />
      <Header>
        <h1>Wheel of Names</h1>
      </Header>
      <Question />
      <Main>
        <Participants handleAddName={handleAddName} />
        <Wheel participants={names} />
      </Main>
    </Provider>
  );
}

export default App;
