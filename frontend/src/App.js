import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameHeader from "./components/GameHeader";
import GameReels from "./components/GameReels";
import GameControls from "./components/GameControls";
import GameStats from "./components/GameStats";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import { 
  gameConfig, 
  generateRandomReels, 
  calculateWinnings,
  gameHistory as mockHistory,
  bonusFeatures as mockBonusFeatures
} from "./data/mockData";

const GobexSlotGame = () => {
  const [balance, setBalance] = useState(1000.00);
  const [currentBet, setCurrentBet] = useState(gameConfig.defaultBet);
  const [reels, setReels] = useState(generateRandomReels());
  const [isSpinning, setIsSpinning] = useState(false);
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [winningLines, setWinningLines] = useState([]);
  const [gameHistory, setGameHistory] = useState(mockHistory);
  const [bonusFeatures, setBonusFeatures] = useState(mockBonusFeatures);
  const [totalSpins, setTotalSpins] = useState(156);
  const [totalWins, setTotalWins] = useState(45);
  const { toast } = useToast();

  useEffect(() => {
    // Auto-spin logic
    let autoSpinInterval;
    if (isAutoSpin && balance >= currentBet && !isSpinning) {
      autoSpinInterval = setTimeout(() => {
        handleSpin();
      }, 3000);
    }

    return () => clearTimeout(autoSpinInterval);
  }, [isAutoSpin, balance, currentBet, isSpinning]);

  const handleSpin = async () => {
    if (balance < currentBet || isSpinning) return;

    setIsSpinning(true);
    setBalance(prev => prev - currentBet);
    setWinningLines([]);
    setTotalSpins(prev => prev + 1);

    // Simulate spinning animation
    const spinDuration = 2000;
    const intervalDuration = 100;
    const spinInterval = setInterval(() => {
      setReels(generateRandomReels());
    }, intervalDuration);

    setTimeout(() => {
      clearInterval(spinInterval);
      
      // Generate final reel combination
      const finalReels = generateRandomReels();
      setReels(finalReels);
      
      // Calculate winnings
      const { totalWin, winningLines: lines } = calculateWinnings(finalReels, currentBet);
      
      if (totalWin > 0) {
        setBalance(prev => prev + totalWin);
        setLastWin(totalWin);
        setWinningLines(lines);
        setTotalWins(prev => prev + 1);
        
        // Update bonus features
        const scatterCount = finalReels.filter(symbol => symbol.name === "Black Scatter").length;
        if (scatterCount > 0) {
          setBonusFeatures(prev => ({
            ...prev,
            blackScatter: {
              ...prev.blackScatter,
              count: Math.min(prev.blackScatter.count + scatterCount, 3)
            }
          }));
        }

        // Update jackpot progress
        setBonusFeatures(prev => ({
          ...prev,
          jackpotProgress: Math.min(prev.jackpotProgress + 0.01, 1)
        }));

        toast({
          title: "🎉 WIN!",
          description: `You won $${totalWin.toFixed(2)}! (${lines.length} winning lines)`,
          duration: 3000,
        });

        // Add to game history
        const newGame = {
          id: Date.now(),
          bet: currentBet,
          win: totalWin,
          multiplier: totalWin / currentBet,
          timestamp: new Date().toLocaleString()
        };
        setGameHistory(prev => [newGame, ...prev.slice(0, 9)]);
      } else {
        setLastWin(0);
      }

      setIsSpinning(false);
    }, spinDuration);
  };

  const handleAutoSpin = () => {
    if (balance < currentBet) {
      toast({
        title: "Insufficient Balance",
        description: "Not enough balance for auto spin",
        variant: "destructive",
      });
      return;
    }
    setIsAutoSpin(!isAutoSpin);
  };

  const handleBetChange = (newBet) => {
    if (!isSpinning) {
      setCurrentBet(newBet);
    }
  };

  const handleSymbolClick = (symbol, position) => {
    if (!isSpinning) {
      toast({
        title: symbol.name,
        description: `Value: ${symbol.value > 0 ? `$${symbol.value}` : 'Special'} - Rarity: ${symbol.rarity}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <GameHeader 
        balance={balance}
        jackpot={gameConfig.jackpot}
        gameName={gameConfig.gameName}
        subtitle={gameConfig.subtitle}
      />
      
      <div className="container mx-auto py-6 space-y-6">
        <GameReels 
          reels={reels}
          isSpinning={isSpinning}
          onSymbolClick={handleSymbolClick}
          winningLines={winningLines}
        />
        
        <GameControls 
          bet={currentBet}
          onBetChange={handleBetChange}
          onSpin={handleSpin}
          onAutoSpin={handleAutoSpin}
          isSpinning={isSpinning}
          isAutoSpin={isAutoSpin}
          balance={balance}
          lastWin={lastWin}
          minBet={gameConfig.minBet}
          maxBet={gameConfig.maxBet}
          lines={gameConfig.lines}
        />
        
        <GameStats 
          gameHistory={gameHistory}
          bonusFeatures={bonusFeatures}
          jackpotProgress={bonusFeatures.jackpotProgress}
          totalSpins={totalSpins}
          totalWins={totalWins}
        />
      </div>
      
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GobexSlotGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
