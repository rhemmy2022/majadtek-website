document.addEventListener('DOMContentLoaded', () => {
    // 1) Detect current page
    const rawCurrent = window.location.pathname.split('/').pop();
    const currentPage = rawCurrent === '' ? 'index.html' : rawCurrent;

    // 2) Add hover behavior and active state to all nav links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        // Add hover classes
        link.classList.add('hover:text-[rgb(42,142,158)]', 'hover:border-[rgb(42,142,158)]');

        // Mark active page
        const href = link.getAttribute('href');
        if (!href) return;

        const linkFile = href.split('/').pop() || href;

        if (linkFile === currentPage) {
            link.classList.add('text-[rgb(42,142,158)]', 'border-[rgb(42,142,158)]', 'font-semibold');
        }
    });

    // 3) Mobile menu toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('open-icon');
    const closeIcon = document.getElementById('close-icon');

    if (menuBtn && mobileMenu && openIcon && closeIcon) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });

        // Optional: Close menu when clicking a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    openIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
            });
        });
    }
});


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', '-translate-x-10');
            entry.target.classList.add('opacity-100', 'translate-x-0');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-section').forEach(section => {
    observer.observe(section);
});

