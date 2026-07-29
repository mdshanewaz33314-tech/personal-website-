document.addEventListener('DOMContentLoaded', () => {

    // 1. Safe Null-Check for Theme Toggle & Dynamic Aria Attributes
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        htmlElement.setAttribute('data-theme', savedTheme);
        updateToggleState(savedTheme);

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleState(newTheme);
        });
    }

    function updateToggleState(theme) {
        if (!themeToggleBtn) return;
        const isDark = theme === 'dark';
        themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
        themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    }

    // 2. Mobile Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close mobile menu when link is clicked
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. ScrollSpy (Active Navigation Link on Scroll)
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    // 4. Parallax Background Subtle Effect
    const parallaxBg = id => document.getElementById(id);
    const bgElement = parallaxBg('parallax');

    if (bgElement) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            bgElement.style.transform = `translateY(${scrolled * 0.25}px)`;
        });
    }

    // 5. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));
});
