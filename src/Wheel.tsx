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

const Sector = styled.div<{
  angle: number;
  color: string;
  sectorWidth: number;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  clip-path: ${({ sectorWidth }) =>
    `polygon(50% 50%, 100% 100%, 100% ${sectorWidth}%)`};
  background-color: ${({ color }) => color};
  transform-origin: 50% 50%;
  transform: ${({ angle }) => `rotate(${angle}deg)`};
`;

const Name = styled.span<{ angle: number; numSectors: number }>`
  position: absolute;
  margin: -5px;
  top: 50%;
  left: 50%;
  transform: ${({ angle }) =>
    angle > 180
      ? 'translate(120px, 0%) rotate(angle)'
      : 'translate(75px, 0) rotate(angle)'};
  transform-origin: 20% 50%;
  white-space: nowrap;
  color: #000;
  font-size: ${({ numSectors }) => (numSectors < 6 ? '0.9rem' : '0.6rem')};
  z-index: 1;
  text-align: center;
  width: 220px;
`;

const colors = [
  '#FF5733', // Vibrant orange
  '#FFBD33', // Bright yellow
  '#DBFF33', // Light green-yellow
  '#75FF33', // Bright green
  '#33FF57', // Bright teal-green
  '#33FFBD', // Turquoise
  '#33A1FF', // Sky blue
  '#3357FF', // Bright blue
  '#5733FF', // Purple
  '#BD33FF', // Violet
  '#FF33A1', // Hot pink
  '#FF3333', // Red
  '#FF6F33', // Coral
  '#FFB833', // Gold
  '#DFFF33', // Lime green
  '#7DFF33', // Olive green
  '#33FF77', // Mint green
  '#33FFB3', // Pale turquoise
  '#33B2FF', // Deep sky blue
  '#5C33FF', // Royal blue
  '#A533FF', // Medium purple
  '#FF33B5', // Fuchsia
  '#FF3366', // Hot pink
];

const MAX_SECTORS = 18;

interface Props {
  participants: string[];
}

export const Wheel: FC<Props> = ({ participants }) => {
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const numSectors = Math.min(participants.length, MAX_SECTORS);
  const sliceAngle = 360 / numSectors;

  const sectorWidth = 1350 / numSectors;

  console.log('sectorWidth', sectorWidth);

  // Generate colors ensuring no two adjacent sectors are the same
  const getColor = (index: number) => {
    const colorIndex = index % colors.length;
    const prevColorIndex = (index - 1 + colors.length) % colors.length;
    return colors[
      colorIndex === prevColorIndex
        ? (colorIndex + 1) % colors.length
        : colorIndex
    ];
  };

  const startSpin = () => {
    setSpinning(true);
    const randomAngle = Math.floor(Math.random() * 360) + 1800;
    setRotation(rotation + randomAngle);

    setTimeout(() => {
      setSpinning(false);
      const finalRotation = randomAngle % 360;
      const selectedSlice = Math.floor(finalRotation / sliceAngle);
      setSelectedIndex(numSectors - selectedSlice - 1);
    }, 5000);
  };

  return (
    <Section>
      <h2>Wheel</h2>
      <WheelContainer>
        <CircleContainer rotation={rotation}>
          {participants.slice(0, numSectors).map((name, i) => {
            const rotate = i * sliceAngle;
            const color = getColor(i);
            return (
              <Sector
                key={i}
                angle={rotate}
                color={color}
                sectorWidth={sectorWidth}
              >
                <Name angle={rotate} numSectors={numSectors}>
                  {name}
                </Name>
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
