import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const GameReels = ({ reels, isSpinning, onSymbolClick, winningLines = [] }) => {
  const [animatingReels, setAnimatingReels] = useState([]);

  useEffect(() => {
    if (isSpinning) {
      // Stagger reel animations
      const delays = [0, 200, 400, 600, 800];
      delays.forEach((delay, index) => {
        setTimeout(() => {
          setAnimatingReels(prev => [...prev, index]);
        }, delay);
      });

      // Stop all animations after spin completes
      setTimeout(() => {
        setAnimatingReels([]);
      }, 2000);
    }
  }, [isSpinning]);

  const isWinningPosition = (position) => {
    return winningLines.some(line => 
      line.positions && line.positions.includes(position)
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="bg-gradient-to-b from-gray-800 to-gray-900 border-gray-600 p-6">
        <div className="grid grid-cols-5 gap-2">
          {reels.map((symbol, index) => {
            const col = index % 5;
            const isAnimating = animatingReels.includes(col) && isSpinning;
            const isWinning = isWinningPosition(index);
            
            return (
              <Button
                key={index}
                variant="ghost"
                className={`
                  h-20 w-20 text-3xl border-2 transition-all duration-300 
                  ${isAnimating 
                    ? 'animate-bounce border-yellow-400 bg-yellow-100' 
                    : 'border-gray-500 bg-gray-700 hover:bg-gray-600'
                  }
                  ${isWinning 
                    ? 'ring-4 ring-yellow-400 border-yellow-400 bg-yellow-900/30 animate-pulse' 
                    : ''
                  }
                `}
                onClick={() => onSymbolClick && onSymbolClick(symbol, index)}
                disabled={isSpinning}
              >
                <div className={`
                  flex flex-col items-center justify-center
                  ${isAnimating ? 'animate-spin' : ''}
                `}>
                  <span className="text-2xl">{symbol.image}</span>
                  <span className="text-xs text-gray-300 mt-1">
                    {symbol.value > 0 ? symbol.value : ''}
                  </span>
                </div>
              </Button>
            );
          })}
        </div>
        
        {winningLines.length > 0 && (
          <div className="mt-4 text-center">
            <div className="text-yellow-400 font-bold">
              Winning Lines: {winningLines.map(line => line.line).join(', ')}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default GameReels;