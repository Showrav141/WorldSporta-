
import React, { useRef, useEffect, useState } from 'react';

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballVX = 2;
    let ballVY = 0;
    const ballRadius = 20;
    const gravity = 0.25;
    let animationFrameId: number;

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Grid Lines (Aesthetic)
      ctx.strokeStyle = '#e2e8f0';
      ctx.beginPath();
      for(let i=0; i<canvas.width; i+=40) { ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); }
      for(let i=0; i<canvas.height; i+=40) { ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); }
      ctx.stroke();

      // Apply Physics
      ballVY += gravity;
      ballX += ballVX;
      ballY += ballVY;

      // Walls
      if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) ballVX *= -1;
      
      // Floor - Game Over
      if (ballY + ballRadius > canvas.height) {
        setIsPlaying(false);
        setScore(prev => {
          if (prev > highScore) setHighScore(prev);
          return prev;
        });
        return;
      }

      // Draw Ball
      ctx.fillStyle = '#f97316'; // Orange-500
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Ball Details
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ballX - 10, ballY);
      ctx.lineTo(ballX + 10, ballY);
      ctx.stroke();

      animationFrameId = window.requestAnimationFrame(gameLoop);
    };

    const handleClick = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      const dist = Math.sqrt((mouseX - ballX) ** 2 + (mouseY - ballY) ** 2);
      if (dist < ballRadius + 30) {
        ballVY = -8;
        ballVX = (ballX - mouseX) * 0.2;
        setScore(prev => prev + 1);
      }
    };

    canvas.addEventListener('mousedown', handleClick);
    gameLoop();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleClick);
    };
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-2">Kick-it Challenge</h1>
        <p className="text-slate-500">Don't let the ball touch the floor! Click it to bounce.</p>
      </div>

      <div className="flex space-x-12">
        <div className="text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Score</p>
          <p className="text-4xl font-black text-orange-500">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Best</p>
          <p className="text-4xl font-black text-slate-900">{highScore}</p>
        </div>
      </div>

      <div className="relative bg-white p-4 rounded-3xl shadow-2xl border-4 border-slate-100 overflow-hidden cursor-crosshair">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={400} 
          className="bg-slate-50 rounded-2xl"
        />
        {!isPlaying && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-white">
            <i className="fas fa-futbol text-6xl text-orange-500 mb-4 animate-bounce"></i>
            <h2 className="text-2xl font-bold mb-6">{score > 0 ? 'Game Over!' : 'Ready to Play?'}</h2>
            <button 
              onClick={() => { setScore(0); setIsPlaying(true); }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-12 rounded-2xl shadow-xl transition"
            >
              START GAME
            </button>
          </div>
        )}
      </div>

      <div className="max-w-md bg-white p-6 rounded-2xl border border-slate-100 flex items-start space-x-4">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
          <i className="fas fa-lightbulb text-orange-500"></i>
        </div>
        <p className="text-sm text-slate-600">
          <strong>Tip:</strong> Click the bottom half of the ball to kick it higher, or the sides to change its horizontal direction.
        </p>
      </div>
    </div>
  );
};

export default Game;
