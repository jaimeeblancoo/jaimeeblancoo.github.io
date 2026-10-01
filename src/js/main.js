import { setupReveals } from './reveal.js';
import { setupNavigation } from './navigation.js';
import { setupLanguageSwitch } from './language.js';
import { setupMotionPreference } from './motion.js';

// HTML contains all the content; JavaScript adds optional interactions.
const motion = setupMotionPreference();
setupReveals(motion);
setupNavigation();
setupLanguageSwitch();
