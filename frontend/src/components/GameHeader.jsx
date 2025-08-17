import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const GameHeader = ({ balance, jackpot, gameName, subtitle }) => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 border-b border-gray-700">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-yellow-400 tracking-wider">
              {gameName}
            </h1>
            <p className="text-gray-300 text-sm">{subtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <Card className="bg-gray-800 border-gray-600 px-4 py-2">
            <div className="text-center">
              <p className="text-gray-400 text-xs">Balance</p>
              <p className="text-white font-bold text-lg">${balance.toFixed(2)}</p>
            </div>
          </Card>
          
          <Card className="bg-gradient-to-r from-yellow-600 to-yellow-500 border-yellow-400 px-4 py-2">
            <div className="text-center">
              <p className="text-yellow-100 text-xs">Jackpot</p>
              <p className="text-white font-bold text-lg animate-pulse">
                ${jackpot.toLocaleString()}
              </p>
            </div>
          </Card>
          
          <Badge variant="secondary" className="bg-green-600 text-white px-3 py-1">
            ONLINE
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;