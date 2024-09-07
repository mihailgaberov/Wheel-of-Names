import { FC, useState } from 'react';
import styled from 'styled-components';
import { Button } from './styles';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 400px;
  position: relative;
`;

const StyledWheel = styled.div<{ rotation: number; spinning: boolean }>`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 2px solid #000;
  transform-origin: center;
  transition: transform 5s ease-out;
  transform: ${({ rotation }) => `rotate(${rotation}deg)`};
`;

const Slice = styled.div<{ angle: number; selected: boolean }>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 50%;
  background-color: ${({ selected }) => (selected ? 'yellow' : '#eee')};
  transform-origin: 0% 100%;
  clip-path: polygon(100% 0, 0% 100%, 100% 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ angle }) => `rotate(${angle}deg) skewY(-30deg)`};
`;

const Name = styled.span`
  position: absolute;
  transform: rotate(-45deg);
`;

interface Props {
  participants: string[];
}

export const Wheel: FC<Props> = ({ participants }) => {
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const sliceAngle = 360 / participants.length;

  const startSpin = () => {
    setSpinning(true);
    const randomAngle = Math.floor(Math.random() * 360) + 1800; // spin at least 5 full rotations
    setRotation(rotation + randomAngle); // Increment rotation to ensure smooth spin

    setTimeout(() => {
      setSpinning(false);
      const finalRotation = randomAngle % 360;
      const selectedSlice = Math.floor(finalRotation / sliceAngle);
      setSelectedIndex(participants.length - selectedSlice - 1);
    }, 5000); // Adjust duration as needed
  };

  return (
    <Section>
      <h2>Wheel</h2>
      <StyledWheel rotation={rotation} spinning={spinning}>
        {participants.map((name, i) => {
          const rotate = i * sliceAngle;
          return (
            <Slice key={i} angle={rotate} selected={selectedIndex === i}>
              <Name>{name}</Name>
            </Slice>
          );
        })}
      </StyledWheel>
      <Button onClick={startSpin} disabled={spinning}>
        Spin
      </Button>
    </Section>
  );
};
