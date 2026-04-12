// Haptic feedback using the Vibration API
// Supports single pulses or patterns

export const vibratePop = () => {
    if (window.navigator.vibrate) {
        window.navigator.vibrate(10); // Very short tap
    }
};

export const vibrateSuccess = () => {
    if (window.navigator.vibrate) {
        window.navigator.vibrate([15, 30, 20]); // Double tap feel
    }
};

export const vibrateError = () => {
    if (window.navigator.vibrate) {
        window.navigator.vibrate([50, 100, 50, 100, 70]); // Intense warning pattern
    }
};

export const vibrateWarning = () => {
    if (window.navigator.vibrate) {
        window.navigator.vibrate(40);
    }
};
