javascript:(function(){
  // Pi² 20 TPS Unlimited Auto-Clicker - No Click Threshold
  console.log('🚀 Pi² 20 TPS Unlimited Auto-Clicker Starting...');
  
  let isActive = false;
  let clickCount = 0;
  let startTime = 0;
  let lastClickTime = 0;
  let sessionClicks = 0;
  let currentTPS = 0;
  let gameStarted = false;
  let gameNumber = 1;
  
  // Unlimited configuration - no click threshold
  const config = {
    peakTPS: 20,              // Target peak TPS
    normalTPS: 18,            // Normal TPS after peak
    peakDuration: 50,         // Clicks at peak TPS
    minDelay: 49,             // 49ms = ~20.4 TPS (ensures 20+ TPS)
    normalDelay: 55,          // 55ms = ~18 TPS
    gameStartDelay: 2000,     // 2 second delay after starting game
    restartDelay: 3000        // 3 second delay after game over
  };
  
  // Function to get target color
  function getTargetColor() {
    const targetImg = document.querySelector('img[alt*="Target Color"]');
    if (targetImg) {
      const altText = targetImg.getAttribute('alt');
      const match = altText.match(/Target Color:\s*(\w+)/i);
      if (match) {
        return match[1].toUpperCase();
      }
    }
    return null;
  }
  
  // Function to calculate optimal delay for 20 TPS peak
  function calculateDelay() {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime;
    
    // Calculate current TPS
    if (timeSinceLastClick > 0) {
      currentTPS = 1000 / timeSinceLastClick;
    }
    
    // Peak TPS phase (first 50 clicks of each game)
    if (sessionClicks < config.peakDuration) {
      return config.minDelay; // 49ms = ~20.4 TPS (ensures 20+ TPS)
    }
    
    // Normal TPS phase (remaining clicks)
    return config.normalDelay; // 55ms = ~18 TPS
  }
  
  // Function to find and click the correct orb
  function clickCorrectOrb() {
    const targetColor = getTargetColor();
    if (!targetColor) {
      console.log('❌ Could not find target color');
      return false;
    }
    
    // Find all orb buttons
    const orbButtons = document.querySelectorAll('button');
    let targetOrb = null;
    
    for (let button of orbButtons) {
      const img = button.querySelector('img');
      if (img && img.alt) {
        const altText = img.alt.toUpperCase();
        if (altText.includes(targetColor) && altText.includes('ORB')) {
          targetOrb = button;
          break;
        }
      }
    }
    
    if (targetOrb && !targetOrb.disabled) {
      // Click the orb
      targetOrb.click();
      clickCount++;
      sessionClicks++;
      lastClickTime = Date.now();
      
      // Log progress with TPS info
      if (sessionClicks % 25 === 0) {
        const phase = sessionClicks < config.peakDuration ? 'PEAK' : 'NORMAL';
        console.log(`📊 Game ${gameNumber} - ${phase}: ${sessionClicks} clicks (${currentTPS.toFixed(1)} TPS)`);
      }
      
      console.log(`✅ Game ${gameNumber} - Click ${sessionClicks} (${targetColor}) - TPS: ${currentTPS.toFixed(1)}`);
      return true;
    } else {
      console.log(`❌ ${targetColor} orb not found or disabled`);
      return false;
    }
  }
  
  // Function to check if game is over
  function isGameOver() {
    const gameOverElements = document.querySelectorAll('h2, h3, div');
    for (let element of gameOverElements) {
      if (element.textContent && element.textContent.includes('Game Over')) {
        return true;
      }
    }
    
    const buttons = document.querySelectorAll('button');
    for (let button of buttons) {
      if (button.textContent && button.textContent.includes('Play Again')) {
        return true;
      }
    }
    
    return false;
  }
  
  // Function to start the game
  function startGame() {
    const buttons = document.querySelectorAll('button');
    for (let button of buttons) {
      if (button.textContent && button.textContent.includes('Play Reactor Mini-Game')) {
        button.click();
        console.log(`🎮 Game ${gameNumber} started! Waiting for game to load...`);
        gameStarted = true;
        return true;
      }
    }
    return false;
  }
  
  // Function to restart game
  function restartGame() {
    const buttons = document.querySelectorAll('button');
    for (let button of buttons) {
      if (button.textContent && button.textContent.includes('Play Again')) {
        button.click();
        gameNumber++;
        console.log(`🔄 Game ${gameNumber} started! Previous game: ${sessionClicks} clicks`);
        clickCount = 0;
        startTime = Date.now();
        sessionClicks = 0;
        gameStarted = true;
        return true;
      }
    }
    return false;
  }
  
  // Main clicking loop - no threshold limit
  function clickLoop() {
    if (!isActive) return;
    
    // Check if game is over (natural game end)
    if (isGameOver()) {
      console.log(`🏁 Game ${gameNumber} over! Total clicks: ${sessionClicks}`);
      if (restartGame()) {
        setTimeout(clickLoop, config.restartDelay);
        return;
      } else {
        console.log('❌ Could not restart game');
        setTimeout(clickLoop, config.restartDelay);
        return;
      }
    }
    
    // Try to click the correct orb (no threshold limit)
    const success = clickCorrectOrb();
    
    // Calculate optimal delay
    const delay = calculateDelay();
    setTimeout(clickLoop, delay);
  }
  
  // Toggle function
  function toggle() {
    if (isActive) {
      isActive = false;
      const duration = (Date.now() - startTime) / 1000;
      const avgTPS = clickCount / duration;
      
      alert(`🚀 Pi² 20 TPS Unlimited Auto-Clicker Stopped!
      
📊 Performance Stats:
• Total Clicks: ${clickCount}
• Current Game Clicks: ${sessionClicks}
• Games Played: ${gameNumber}
• Duration: ${duration.toFixed(1)} seconds
• Average TPS: ${avgTPS.toFixed(1)}
• Current TPS: ${currentTPS.toFixed(1)}

🎯 Unlimited Strategy:
• Peak Phase: 20 TPS (first ${config.peakDuration} clicks per game)
• Normal Phase: 18 TPS (remaining clicks)
• No Click Limit: Plays until natural game over
• Auto-Restart: Continues playing games automatically`);
      
      console.log('⏹️ Unlimited auto-clicker stopped');
    } else {
      isActive = true;
      clickCount = 0;
      startTime = Date.now();
      lastClickTime = 0;
      sessionClicks = 0;
      gameStarted = false;
      gameNumber = 1;
      
      console.log('▶️ Unlimited auto-clicker started');
      console.log('🎯 Strategy: 20 TPS peak → 18 TPS normal (no click limit)');
      console.log('🔄 Auto-restart: Plays until natural game over');
      
      // Start the game first
      if (startGame()) {
        setTimeout(clickLoop, config.gameStartDelay);
      } else {
        console.log('❌ Could not start game, trying to click anyway...');
        setTimeout(clickLoop, 1000);
      }
    }
  }
  
  // Check if we're on the right page
  const hasGameElements = document.querySelector('img[alt*="orb"]') || 
                         document.querySelector('img[alt*="Target"]') ||
                         document.querySelector('button')?.textContent?.includes('Play Reactor Mini-Game');
  
  if (hasGameElements) {
    console.log('✅ Pi² game detected, starting 20 TPS Unlimited auto-clicker...');
    console.log('🚀 Target: 20 TPS peak performance (no click limit)');
    console.log('🎮 Auto-starting game and handling full flow');
    console.log('🔄 Will play until natural game over, then restart');
    toggle(); // Auto-start
  } else {
    console.log('❌ Pi² game not detected');
    alert('🚀 Pi² 20 TPS Unlimited Auto-Clicker\n\n❌ Pi² game not detected on this page.\n\nPlease make sure you are on the Pi² reactor game page.');
  }
})();
