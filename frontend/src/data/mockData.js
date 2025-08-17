// Mock data for GOBEXSLOT Mahjong game
export const gameConfig = {
  gameName: "GOBEXSLOT",
  subtitle: "Mahjong Wins - Black Scatter",
  version: "3.0",
  minBet: 0.25,
  maxBet: 125.00,
  defaultBet: 2.50,
  currency: "$",
  lines: 25,
  jackpot: 15750.00
};

export const mahjongSymbols = [
  { id: 1, name: "Dragon Red", value: 100, image: "🀄", rarity: "rare" },
  { id: 2, name: "Dragon Green", value: 80, image: "🀅", rarity: "rare" },
  { id: 3, name: "Dragon White", value: 80, image: "🀆", rarity: "rare" },
  { id: 4, name: "Wind East", value: 60, image: "🀀", rarity: "medium" },
  { id: 5, name: "Wind South", value: 60, image: "🀁", rarity: "medium" },
  { id: 6, name: "Wind West", value: 60, image: "🀂", rarity: "medium" },
  { id: 7, name: "Wind North", value: 60, image: "🀃", rarity: "medium" },
  { id: 8, name: "Bamboo 9", value: 40, image: "🎋", rarity: "common" },
  { id: 9, name: "Character 9", value: 40, image: "九", rarity: "common" },
  { id: 10, name: "Circle 9", value: 30, image: "⚪", rarity: "common" },
  { id: 11, name: "Black Scatter", value: 0, image: "⚫", rarity: "special" },
  { id: 12, name: "Wild", value: 0, image: "💎", rarity: "special" }
];

export const payLines = [
  [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14],
  [0, 6, 12, 8, 4], [10, 6, 2, 8, 14], [5, 1, 2, 3, 9],
  [5, 11, 12, 13, 9], [0, 1, 7, 13, 14], [10, 11, 7, 3, 4],
  [0, 6, 7, 8, 4], [10, 6, 7, 8, 14], [5, 6, 2, 8, 9],
  [5, 6, 12, 8, 9], [0, 1, 12, 3, 4], [10, 11, 2, 13, 14],
  [0, 11, 7, 3, 4], [10, 1, 7, 13, 14], [5, 1, 7, 3, 9],
  [5, 11, 7, 13, 9], [0, 6, 2, 8, 4], [10, 6, 12, 8, 14],
  [0, 1, 7, 3, 4], [10, 11, 7, 13, 14], [5, 6, 7, 8, 9],
  [1, 6, 7, 8, 13]
];

export const gameHistory = [
  { id: 1, bet: 2.50, win: 15.75, multiplier: 6.3, timestamp: "2025-01-15 14:30" },
  { id: 2, bet: 2.50, win: 0, multiplier: 0, timestamp: "2025-01-15 14:29" },
  { id: 3, bet: 2.50, win: 7.50, multiplier: 3, timestamp: "2025-01-15 14:28" },
  { id: 4, bet: 2.50, win: 0, multiplier: 0, timestamp: "2025-01-15 14:27" },
  { id: 5, bet: 2.50, win: 25.00, multiplier: 10, timestamp: "2025-01-15 14:26" }
];

export const bonusFeatures = {
  freeSpins: {
    triggered: false,
    remaining: 0,
    multiplier: 1
  },
  blackScatter: {
    count: 0,
    needed: 3,
    bonus: 500
  },
  jackpotProgress: 0.65
};

// Generate random reel combination
export const generateRandomReels = () => {
  const reels = [];
  for (let i = 0; i < 15; i++) {
    const randomSymbol = mahjongSymbols[Math.floor(Math.random() * mahjongSymbols.length)];
    reels.push(randomSymbol);
  }
  return reels;
};

// Calculate winnings based on reel combination
export const calculateWinnings = (reels, bet) => {
  let totalWin = 0;
  let winningLines = [];
  
  payLines.forEach((line, index) => {
    const lineSymbols = line.map(pos => reels[pos]);
    const firstSymbol = lineSymbols[0];
    
    // Check for matching symbols
    let matches = 1;
    for (let i = 1; i < lineSymbols.length; i++) {
      if (lineSymbols[i].id === firstSymbol.id || lineSymbols[i].name === "Wild") {
        matches++;
      } else {
        break;
      }
    }
    
    if (matches >= 3) {
      const multiplier = matches === 3 ? 1 : matches === 4 ? 3 : 10;
      const lineWin = (firstSymbol.value / 100) * bet * multiplier;
      totalWin += lineWin;
      winningLines.push({ line: index + 1, matches, win: lineWin });
    }
  });
  
  return { totalWin, winningLines };
};