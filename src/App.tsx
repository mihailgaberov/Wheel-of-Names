import './App.css';

import styled from 'styled-components';

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
`;

const Section = styled.section`
  width: 40%;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  width: 60%;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #282c34;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;

  // hover effect
  &:hover {
    background-color: #61dafb;
  }
`;

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

function App() {
  return (
    <>
      <Header>
        <h1>Wheel of Names</h1>
      </Header>
      <Main>
        <Section>
          <h2>Add Participants</h2>
          <Input type="text" />
          <Button>Add</Button>
          <h2>Participants</h2>
          <ul>
            <ListItem>Participant 1</ListItem>
            <ListItem>Participant 2</ListItem>
            <ListItem>Participant 3</ListItem>
          </ul>
        </Section>
        <Section>
          <h2>Wheel</h2>
          <Button>Spin</Button>
        </Section>
      </Main>
    </>
  );
}

export default App;
