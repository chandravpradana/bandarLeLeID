export function initTheme() {
    const themeSwitch = document.getElementById('themeSwitch');
    const themeLabel = document.getElementById('theme-label');

    themeSwitch.addEventListener('change', function () {
        document.body.classList.toggle('light-theme');
        themeLabel.textContent = document.body.classList.contains('light-theme') ? 'Mode Terang' : 'Mode Gelap';
        localStorage.setItem('theme', this.checked ? 'light' : 'dark');
    });

    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        themeSwitch.checked = true;
        themeLabel.textContent = 'Mode Terang';
    }
}
