import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { Button } from './styles';
import { capitalize } from './utils';

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

interface Props {
  participants: string[];
}

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

export const Wheel: React.FC<Props> = ({ participants }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [spinDirection, setSpinDirection] = useState<
    'clockwise' | 'counterclockwise'
  >('clockwise');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const numSectors = participants.length;

  useEffect(() => {
    if (canvasRef.current) {
      drawWheel();
    }
  }, [participants, rotation]);

  const darkenColor = (color: string, amount: number): string => {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);

    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  const drawWheel = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const radius = canvas.width / 2;
    const sliceAngle = (2 * Math.PI) / numSectors;

    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(radius, radius);
    ctx.rotate(-rotation * (Math.PI / 180));

    // Draw sectors
    for (let i = 0; i < numSectors; i++) {
      const startAngle = i * sliceAngle;
      const endAngle = (i + 1) * sliceAngle;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      const color = darkenColor(colors[i % colors.length], 30);
      ctx.fillStyle = color;
      ctx.fill();

      // Draw the name in the sector
      ctx.save();
      ctx.rotate((startAngle + endAngle) / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.shadowBlur = 3;
      ctx.fillText(capitalize(participants[i]) || '', radius * 0.5, 0);
      ctx.restore();
    }

    ctx.rotate(rotation * (Math.PI / 180)); // Reset rotation
    ctx.translate(-radius, -radius);

    // Draw the static indicator
    const indicatorLength = 20;
    const indicatorWidth = 10;
    ctx.save();
    ctx.translate(canvas.width, canvas.height / 2);
    ctx.beginPath();
    ctx.moveTo(-indicatorLength, -indicatorWidth / 2);
    ctx.lineTo(0, -indicatorWidth / 2);
    ctx.lineTo(0, indicatorWidth / 2);
    ctx.lineTo(-indicatorLength, indicatorWidth / 2);
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.restore();
  };

  const startSpin = () => {
    if (spinning) return;
    setSpinning(true);

    // Set the number of full rotations and calculate final rotation
    const numFullRotations = 2.5;
    const totalRotation = numFullRotations * 360;
    const finalRotation =
      (rotation +
        (spinDirection === 'clockwise' ? -totalRotation : totalRotation)) %
      360;

    const spinDuration = 6000; // Duration of the animation
    const easing = (t: number) => {
      // Ease-out cubic
      return 1 - Math.pow(1 - t, 3);
    };

    let startTime: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const t = Math.min(elapsed / spinDuration, 1);
      const easeT = easing(t);
      const currentRotation =
        rotation +
        (spinDirection === 'clockwise' ? -totalRotation : totalRotation) *
          easeT;

      setRotation(currentRotation);

      if (elapsed < spinDuration) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        determineWinner(finalRotation);
      }
    };

    requestAnimationFrame(animate);
  };

  const determineWinner = (finalRotation: number) => {
    const sliceAngle = 360 / numSectors;
    const winningSector = Math.floor(
      ((finalRotation % 360) +
        (spinDirection === 'clockwise' ? 0 : sliceAngle / 2)) /
        sliceAngle,
    );
    setWinnerIndex(winningSector);
  };

  const changeSpinDirection = () => {
    if (spinDirection === 'clockwise') {
      setSpinDirection('counterclockwise');
    } else {
      setSpinDirection('clockwise');
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{ borderRadius: '50%', border: '2px solid black' }}
      />
      <ButtonsContainer>
        <Button
          onClick={changeSpinDirection}
          disabled={participants.length === 0 || spinning}
        >
          {capitalize(spinDirection)}
        </Button>
        <Button
          onClick={startSpin}
          disabled={participants.length === 0 || spinning}
        >
          Spin
        </Button>
      </ButtonsContainer>
      {winnerIndex !== null && (
        <div>
          <h3>Winner: {participants[winnerIndex]}</h3>
        </div>
      )}
    </div>
  );
};
