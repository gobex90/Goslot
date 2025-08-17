import React from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Zap, Target, TrendingUp } from 'lucide-react';

const GameStats = ({ 
  gameHistory, 
  bonusFeatures, 
  jackpotProgress,
  totalSpins = 0,
  totalWins = 0 
}) => {
  const winRate = totalSpins > 0 ? ((totalWins / totalSpins) * 100).toFixed(1) : 0;
  const recentWins = gameHistory.filter(game => game.win > 0).slice(0, 5);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Jackpot Progress */}
        <Card className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border-yellow-600 p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Target className="text-yellow-400" size={20} />
              <h3 className="text-yellow-400 font-semibold">Jackpot Progress</h3>
            </div>
            <Progress 
              value={jackpotProgress * 100} 
              className="h-3 bg-gray-700"
            />
            <p className="text-yellow-300 text-sm text-center">
              {(jackpotProgress * 100).toFixed(1)}% Complete
            </p>
          </div>
        </Card>

        {/* Black Scatter Feature */}
        <Card className="bg-gradient-to-br from-gray-900/50 to-black/30 border-gray-600 p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Zap className="text-purple-400" size={20} />
              <h3 className="text-purple-400 font-semibold">Black Scatter</h3>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">Collected:</span>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className={`w-6 h-6 rounded-full border-2 ${
                      i < bonusFeatures.blackScatter.count 
                        ? 'bg-purple-500 border-purple-400' 
                        : 'bg-gray-700 border-gray-500'
                    }`}
                  >
                    {i < bonusFeatures.blackScatter.count && (
                      <span className="text-white text-xs flex items-center justify-center h-full">
                        ⚫
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              {bonusFeatures.blackScatter.needed - bonusFeatures.blackScatter.count} more for bonus
            </p>
          </div>
        </Card>

        {/* Win Statistics */}
        <Card className="bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-600 p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-green-400" size={20} />
              <h3 className="text-green-400 font-semibold">Statistics</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Win Rate:</span>
                <Badge variant="secondary" className="bg-green-600 text-white">
                  {winRate}%
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Total Spins:</span>
                <span className="text-white font-semibold">{totalSpins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Total Wins:</span>
                <span className="text-green-400 font-semibold">{totalWins}</span>
              </div>
            </div>
          </div>
        </Card>

      </div>
      
      {/* Recent Wins */}
      {recentWins.length > 0 && (
        <Card className="bg-gray-800 border-gray-600 p-4 mt-4">
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <TrendingUp className="mr-2 text-green-400" size={20} />
            Recent Wins
          </h3>
          <div className="space-y-2">
            {recentWins.map((game, index) => (
              <div 
                key={game.id} 
                className="flex justify-between items-center p-2 bg-gray-700 rounded"
              >
                <span className="text-gray-300 text-sm">
                  Bet: ${game.bet.toFixed(2)}
                </span>
                <span className="text-green-400 font-semibold">
                  +${game.win.toFixed(2)}
                </span>
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  {game.multiplier}x
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default GameStats;