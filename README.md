# Pi² Auto-Clicker 🚀

Simple JavaScript scripts to automate the Pi² reactor mini-game. These scripts are designed to run in your browser's console for maximum performance.

## How to Use

### Console Copy-Paste
1. Open the Pi² game page in your browser
2. Press `F12` to open Developer Tools
3. Go to the **Console** tab
4. Copy and paste one of the scripts below
5. Press `Enter` to run

## Scripts
The scripts automatically start new games and restarts with a new game when the current game's stopped.

### `pi2-20tps-ultimate.js`
It seems the team applied a threshold on 220 clicks & 20 TPS, if you pass it, you earn 0 points, so this script is the best fit.
- **Peak Performance**: 20 TPS (first 50 clicks)
- **Smart Strategy**: Adapts speed based on game progress
- **Click Limit**: Stops at 220 clicks to avoid detection

### `pi2-20tps-unlimited.js`
This one's peak TPS is 20, but has no limit in number of clicks and you have to stop it manually. Tho, you might not earn any point if you pass 220 clicks
- **Peak Performance**: 20 TPS (first 50 clicks)
- **No Limits**: Plays until natural game over

## Scripts logic
Both scripts use a **phased approach**:
1. **Peak Phase**: 20 TPS for first 50 clicks
2. **Normal Phase**: 18 TPS for remaining clicks
3. **Auto-Restart**: Handles game flow automatically

---

**Note**: These scripts are for educational purposes. Use responsibly and in accordance with the game's terms of service.