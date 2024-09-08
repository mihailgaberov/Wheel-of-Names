import './App.css';

import styled from 'styled-components';
import { Participants } from './Participants';
import { Wheel } from './Wheel';

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
      <Main>
        <Participants />
        <Wheel
          participants={[
            '1. Mihail',
            '2. Xavi',
            '3. Ale',
            '4. Javi',
            '5. Alex',
            '6. Sara',
            '7. Jorge',
            '8. Mihail',
            '9. Marta',
            '10. Jose',
            '11. Juan',
            '12. David',
            '13. Miguel',
            '14. Alma',
            '15. Alba',
            '16. Toni',
            '17. Pedro',
            '18. Maria',
          ]}
        />
      </Main>
    </>
  );
}

export default App;
