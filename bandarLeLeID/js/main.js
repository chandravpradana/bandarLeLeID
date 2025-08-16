import { initTheme } from './theme.js';
import { initForm } from './form.js';
import { updateStats } from './stats.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initForm();
    updateStats();
});
