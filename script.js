// Dark/Light Mode Toggle
const themeBtn = document.querySelector('.dark-btn');
const themeIcon = themeBtn.querySelector('i');
const body = document.body;

// Check if user has a saved theme preference
const savedTheme = localStorage.getItem('theme');

// If there's a saved theme, apply it on page load
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Toggle theme when button is clicked
themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Change icon based on current mode
    if (body.classList.contains('light-mode')) {
        // Switch to sun icon (light mode active)
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        // Switch to moon icon (dark mode active)
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});