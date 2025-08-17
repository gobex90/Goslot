import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Play, Pause, RotateCcw, Settings, Info } from 'lucide-react';

const GameControls = ({ 
  bet, 
  onBetChange, 
  onSpin, 
  onAutoSpin, 
  isSpinning, 
  isAutoSpin, 
  balance, 
  lastWin,
  minBet,
  maxBet,
  lines 
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [autoSpinCount, setAutoSpinCount] = useState(10);

  const handleBetIncrease = () => {
    const newBet = Math.min(bet + 0.25, maxBet);
    onBetChange(newBet);
  };

  const handleBetDecrease = () => {
    const newBet = Math.max(bet - 0.25, minBet);
    onBetChange(newBet);
  };

  const handleMaxBet = () => {
    onBetChange(maxBet);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="bg-gray-800 border-gray-600 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bet Controls */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-center">Bet Controls</h3>
            <div className="flex items-center justify-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleBetDecrease}
                disabled={isSpinning || bet <= minBet}
                className="w-10 h-10 p-0"
              >
                -
              </Button>
              
              <Card className="bg-gray-700 border-gray-500 px-4 py-2 min-w-[100px]">
                <div className="text-center">
                  <p className="text-gray-300 text-xs">Bet</p>
                  <p className="text-white font-bold">${bet.toFixed(2)}</p>
                </div>
              </Card>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleBetIncrease}
                disabled={isSpinning || bet >= maxBet}
                className="w-10 h-10 p-0"
              >
                +
              </Button>
            </div>
            
            <div className="flex justify-center space-x-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleMaxBet}
                disabled={isSpinning}
              >
                Max Bet
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm">Lines: {lines}</p>
              <p className="text-gray-400 text-sm">Total: ${(bet * lines).toFixed(2)}</p>
            </div>
          </div>

          {/* Spin Controls */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-center">Game Controls</h3>
            
            <div className="flex justify-center">
              <Button 
                onClick={onSpin}
                disabled={isSpinning || balance < bet}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold text-lg shadow-lg border-4 border-green-400"
              >
                {isSpinning ? (
                  <div className="animate-spin">
                    <RotateCcw size={32} />
                  </div>
                ) : (
                  <Play size={32} />
                )}
              </Button>
            </div>
            
            <div className="flex justify-center space-x-2">
              <Button 
                variant={isAutoSpin ? "destructive" : "secondary"}
                onClick={onAutoSpin}
                disabled={balance < bet}
                className="px-6"
              >
                {isAutoSpin ? (
                  <>
                    <Pause className="mr-2" size={16} />
                    Stop Auto
                  </>
                ) : (
                  <>
                    <Play className="mr-2" size={16} />
                    Auto Spin
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Game Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-center">Game Info</h3>
            
            <div className="space-y-2">
              <Card className="bg-gray-700 border-gray-500 p-3">
                <div className="text-center">
                  <p className="text-gray-300 text-xs">Last Win</p>
                  <p className={`font-bold ${lastWin > 0 ? 'text-green-400' : 'text-gray-400'}`}>
                    ${lastWin.toFixed(2)}
                  </p>
                </div>
              </Card>
              
              <Card className="bg-gray-700 border-gray-500 p-3">
                <div className="text-center">
                  <p className="text-gray-300 text-xs">Balance</p>
                  <p className="text-white font-bold">${balance.toFixed(2)}</p>
                </div>
              </Card>
            </div>
            
            <div className="flex justify-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings size={16} />
              </Button>
              
              <Button variant="ghost" size="sm">
                <Info size={16} />
              </Button>
            </div>
          </div>
          
        </div>
      </Card>
    </div>
  );
};

export default GameControls;