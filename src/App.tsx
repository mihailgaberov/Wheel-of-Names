import './App.css';

import styled from 'styled-components';
import { Participants } from './Participants';
import { Wheel } from './Wheel';
import { Question } from './Questsion';

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

function App() {
  return (
    <>
      <Header>
        <h1>Wheel of Names</h1>
      </Header>
      <Question />
      <Main>
        <Participants />
        <Wheel
          participants={[
            'Mihail',
            'Xavi',
            // 'Ale',
            // 'Javi',
            // 'Alex',
            // 'Sara',
            // 'Jorge',
            // 'Mihail',
            'Marta',
            'Jose',
            // 'Juan',
            // 'David',
            // 'Miguel',
            // 'Alma',
            'Alba',
            'Toni',
            // 'Pedro',
            'Maria',
          ]}
        />
      </Main>
    </>
  );
}

export default App;
