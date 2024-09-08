import { FC, useState } from 'react';
import styled from 'styled-components';
import { Button } from './styles';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 500px;
  position: relative;
`;

const WheelContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin-bottom: 2rem;
`;

const WinnerIndicator = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 20px solid red;
  top: 50%;
  left: 100%;
  transform: translate(-50%, -50%) rotate(-90deg);
  z-index: 10;
`;

const CircleContainer = styled.div<{ rotation: number }>`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  transform-origin: center;
  transition: transform 5s ease-out;
  transform: ${({ rotation }) => `rotate(${rotation}deg)`};
`;

const Sector = styled.div<{ angle: number; color: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  clip-path: polygon(50% 50%, 100% 0%, 100% 100%);
  background-color: ${({ color }) => color};
  transform-origin: 50% 50%;
  transform: ${({ angle }) => `rotate(${angle}deg)`};
`;

const Name = styled.span<{ angle: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${({ angle }) => `rotate(${-angle}deg) translate(90px)`};
  transform-origin: 0 0;
  white-space: nowrap;
  color: #000;
  font-size: 1rem;
  font-weight: bold;
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
    const randomAngle = Math.floor(Math.random() * 360) + 1800;
    setRotation(rotation + randomAngle);

    setTimeout(() => {
      setSpinning(false);
      const finalRotation = randomAngle % 360;
      const selectedSlice = Math.floor(finalRotation / sliceAngle);
      setSelectedIndex(participants.length - selectedSlice - 1);
    }, 5000);
  };

  return (
    <Section>
      <h2>Wheel</h2>
      <WheelContainer>
        <CircleContainer rotation={rotation}>
          {participants.map((name, i) => {
            const rotate = i * sliceAngle;
            return (
              <Sector
                key={i}
                angle={rotate}
                color={i % 2 === 0 ? '#ffdddd' : '#ddffdd'}
              >
                <Name angle={rotate}>{name}</Name>
              </Sector>
            );
          })}
        </CircleContainer>
        <WinnerIndicator />
      </WheelContainer>
      <Button onClick={startSpin} disabled={spinning}>
        Spin
      </Button>
    </Section>
  );
};
