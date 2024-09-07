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
`;

const StyledWheel = styled.div<{ rotation: number; spinning: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
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
  background: ${({ selected }) =>
    selected
      ? 'radial-gradient(circle, yellow, orange)'
      : 'radial-gradient(circle, #eee, #ddd)'};
  border: 2px solid #000;
  transform-origin: 0% 100%;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ angle }) => `rotate(${angle}deg) skewY(-30deg)`};
`;

const Name = styled.span`
  position: absolute;
  transform: rotate(-45deg);
  white-space: nowrap;
  color: #000;
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
  transform: translate(-50%, -50%) rotate(90deg);
  z-index: 10;
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
        <WinnerIndicator />
      </WheelContainer>
      <Button onClick={startSpin} disabled={spinning}>
        Spin
      </Button>
    </Section>
  );
};
