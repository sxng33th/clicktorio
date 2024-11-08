import { gameState } from './state.js';
import { updateDisplayElements } from './main.js';

let autoClickerInterval = null;

export function startAutoClicker() {
    if (autoClickerInterval) {
        clearInterval(autoClickerInterval);
    }
    
    autoClickerInterval = setInterval(() => {
        gameState.addClicks(gameState.upgrade);
        updateDisplayElements();
    }, gameState.autoClickerSpeed);
    
    gameState.autoClickerActive = true;
    document.getElementById("autoClicker").innerHTML = "Stop Auto Clicker";
}

export function stopAutoClicker() {
    if (autoClickerInterval) {
        clearInterval(autoClickerInterval);
        autoClickerInterval = null;
    }
    gameState.autoClickerActive = false;
    document.getElementById("autoClicker").innerHTML = "Start Auto Clicker";
}

export function handleAutoClickerUpgrade() {
    if (gameState.clicks >= gameState.autoClickerUpgradeCost) {
        gameState.clicks -= gameState.autoClickerUpgradeCost;
        gameState.autoClickerUpgradeCost = Math.floor(gameState.autoClickerUpgradeCost * 2);
        gameState.autoClickerSpeed = Math.max(100, gameState.autoClickerSpeed * 0.9);
        
        // Restart autoClicker if it's active to apply new speed
        if (gameState.autoClickerActive) {
            startAutoClicker();
        }
        return true;
    } else {
        alert(`You need ${gameState.autoClickerUpgradeCost - gameState.clicks} more clicks to upgrade Auto Clicker!`);
        return false;
    }
}