import React, { useRef, useState, useEffect } from 'react';

interface Props {
  participants: string[];
}

export const Wheel: React.FC<Props> = ({ participants }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const numSectors = participants.length;

  useEffect(() => {
    if (canvasRef.current) {
      drawWheel();
    }
  }, [participants, rotation]);

  const drawWheel = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const radius = canvas.width / 2;
    const sliceAngle = (2 * Math.PI) / numSectors;

    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(radius, radius);
    ctx.rotate(-rotation * (Math.PI / 180)); // Rotate canvas for spinning effect

    // Draw sectors
    for (let i = 0; i < numSectors; i++) {
      const startAngle = i * sliceAngle;
      const endAngle = (i + 1) * sliceAngle;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = `hsl(${(i * (360 / numSectors)) % 360}, 100%, 50%)`;
      ctx.fill();

      // Draw the name in the sector
      ctx.save();
      ctx.rotate((startAngle + endAngle) / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.fillText(participants[i] || '', radius * 0.5, 0);
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

    const randomRotation = Math.floor(Math.random() * 360) + 1800;
    const finalRotation = randomRotation % 360;
    const spinDuration = 6000; // Increased duration
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
      const currentRotation = finalRotation * easeT;

      setRotation(currentRotation);

      if (elapsed < spinDuration) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        determineWinner(currentRotation);
      }
    };

    requestAnimationFrame(animate);
  };

  const determineWinner = (finalRotation: number) => {
    const sliceAngle = 360 / numSectors;
    const winningSector = Math.floor((finalRotation % 360) / sliceAngle);
    setWinnerIndex(winningSector);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{ borderRadius: '50%', border: '2px solid black' }}
      />
      <button
        onClick={startSpin}
        disabled={participants.length === 0 || spinning}
      >
        Spin
      </button>
      {winnerIndex !== null && (
        <div>
          <h3>Winner: {participants[winnerIndex]}</h3>
        </div>
      )}
    </div>
  );
};
