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
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
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
  sectorwidth: number;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  clip-path: ${({ sectorwidth }) =>
    `polygon(50% 50%, 100% 100%, 100% ${sectorwidth}%)`};
  background-color: ${({ color }) => color};
  transform-origin: 50% 50%;
  transform: ${({ angle }) => `rotate(${angle}deg)`};
`;

const Name = styled.span<{ angle: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${({ angle }) => `rotate(${angle}deg) translate(75px, 50%)`};
  transform-origin: 0% 0%;
  white-space: nowrap;
  color: white;
  font-size: 0.9em;
  z-index: 10;
  text-align: center;
  padding: 2px 4px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
`;

const colors = [
  '#CC4629', // Darker vibrant orange
  '#CC9A29', // Darker bright yellow
  '#B2CC29', // Darker light green-yellow
  '#5ECC29', // Darker bright green
  '#29CC46', // Darker bright teal-green
  '#29CC99', // Darker turquoise
  '#2985CC', // Darker sky blue
  '#293FCC', // Darker bright blue
  '#4629CC', // Darker purple
  '#9929CC', // Darker violet
  '#CC2981', // Darker hot pink
  '#CC2929', // Darker red
  '#CC5929', // Darker coral
  '#CC9529', // Darker gold
  '#B2CC29', // Darker lime green
  '#66CC29', // Darker olive green
  '#29CC5F', // Darker mint green
  '#29CC91', // Darker pale turquoise
  '#298ECC', // Darker deep sky blue
  '#4A29CC', // Darker royal blue
  '#8429CC', // Darker medium purple
  '#CC298F', // Darker fuchsia
  '#CC294F', // Darker hot pink
];

export const MAX_SECTORS = 18;

interface Props {
  participants: string[];
}

export const Wheel: FC<Props> = ({ participants }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const sliceAngle = 360 / MAX_SECTORS;
  const sectorWidth = 1350 / MAX_SECTORS;

  const getColor = (index: number) => {
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  };

  const startSpin = () => {
    setSpinning(true);
    const randomAngle = Math.floor(Math.random() * 360) + 1800;
    setRotation(rotation + randomAngle);

    setTimeout(() => {
      setSpinning(false);
    }, 5000);
  };

  return (
    <Section>
      <h2>Wheel</h2>
      <WheelContainer>
        <CircleContainer rotation={rotation}>
          {Array.from({ length: MAX_SECTORS }).map((_, i) => {
            const rotate = i * sliceAngle;
            const color = getColor(i);
            return (
              <Sector
                key={i}
                angle={rotate}
                color={color}
                sectorwidth={sectorWidth}
              />
            );
          })}
          {/* Render names separately so they're not clipped by sectors */}
          {participants.slice(0, MAX_SECTORS).map((name, i) => {
            const rotate = i * sliceAngle;
            return (
              <Name key={i} angle={rotate}>
                <i>{name}</i>
              </Name>
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
