let audioInstance = null;
let lastPlayTime = 0;
const THROTTLE_MS = 50; // Prevent rapid firing within 50ms

export const playEveryTap = () => {
    const now = Date.now();
    if (now - lastPlayTime < THROTTLE_MS) {
        return;
    }

    if (!audioInstance) {
        // Use absolute path from public directory for stability
        audioInstance = new Audio("/assets/EveryTap.mp3");
    }

    // Reset and play
    audioInstance.currentTime = 0;
    audioInstance.play().catch(err => {
        // Silent catch for autoplay policy restrictions
        console.warn("Audio play blocked or failed:", err);
    });
    
    lastPlayTime = now;
};
