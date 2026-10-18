// Vibración háptica (Android; iOS Safari la ignora sin error).
const vibrate = (pattern) => navigator.vibrate?.(pattern);

export const vibratePop = () => vibrate(10);
export const vibrateSuccess = () => vibrate([15, 30, 20]);
export const vibrateError = () => vibrate([40, 60, 40]);
