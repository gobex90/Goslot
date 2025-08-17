# GOBEXSLOT - Frontend/Backend Integration Contracts

## Current Implementation Status
✅ **Frontend Only Implementation Complete**
- Modern casino-style Mahjong slot game interface
- Responsive design with shadcn/ui components  
- Interactive spinning reels with animations
- Bet controls and game statistics
- Mock data for all game features

## API Contracts

### 1. Player Management
```
GET /api/player/profile
POST /api/player/login
POST /api/player/register  
PUT /api/player/balance
```

### 2. Game Management
```
POST /api/game/spin
GET /api/game/history/:playerId
POST /api/game/jackpot/progress
GET /api/game/config
```

### 3. Bonus Features
```
POST /api/bonus/blackscatter
GET /api/bonus/freespins/:playerId
POST /api/bonus/claim
```

## Mock Data Currently Used (to be replaced)

### In `/frontend/src/data/mockData.js`:
- **gameConfig**: Game settings (min/max bet, jackpot amount, lines)
- **mahjongSymbols**: Symbol definitions with values and rarities
- **gameHistory**: Recent game results
- **bonusFeatures**: Black scatter progress, free spins, jackpot progress
- **generateRandomReels()**: Simulated slot reel generation
- **calculateWinnings()**: Win calculation logic

## Backend Implementation Plan

### 1. Database Schema
```
Players: id, username, balance, created_at
GameSessions: id, player_id, bet_amount, win_amount, symbols, timestamp
BonusFeatures: id, player_id, scatter_count, freespins_remaining, jackpot_progress
```

### 2. Game Logic (Server-side)
- Move `calculateWinnings()` logic to backend for security
- Implement proper RNG for reel generation
- Server-side validation of all bets and wins
- Real-time jackpot progression across all players

### 3. Frontend/Backend Integration
- Replace mock data calls with actual API calls
- Add authentication context for player sessions
- Implement real-time updates for jackpot progression
- Add error handling for network failures

## Key Features Working in Frontend
✅ Spinning reels with stagger animation
✅ Bet adjustment controls (+/- buttons, max bet)
✅ Auto-spin functionality
✅ Win calculations and line highlighting  
✅ Toast notifications for wins
✅ Game statistics and history tracking
✅ Bonus feature progress (Black Scatter)
✅ Responsive design for mobile/desktop

## Security Considerations for Backend
- All game outcomes must be server-generated
- Bet validation on every spin request
- Balance verification before allowing spins
- Audit trail for all game activities
- Rate limiting for spin requests

## Performance Optimizations
- Lazy loading of game history
- Cached game configuration
- Optimized symbol asset loading
- Efficient real-time jackpot updates