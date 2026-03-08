// Smooth scroll behavior with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(
    '.focus-card, .principle, .case-study, .contact-card'
);

animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(el);
});

// Nav scroll effect
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 20px rgba(10, 22, 40, 0.08)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for background geometry
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const geoLines = document.querySelectorAll('.geo-line');
    const geoDots = document.querySelectorAll('.geo-dot');

    geoLines.forEach((line, index) => {
        const speed = 0.3 + (index * 0.1);
        line.style.transform = `translateY(${scrolled * speed}px) rotate(${-15 + (index * 40)}deg)`;
    });

    geoDots.forEach((dot, index) => {
        const speed = 0.2 + (index * 0.15);
        dot.style.transform = `translateY(${scrolled * speed}px) scale(${1 + (Math.sin(scrolled * 0.01) * 0.5)})`;
    });
});

// Add subtle hover effect for case studies
const caseStudies = document.querySelectorAll('.case-study');

caseStudies.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(8px)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
});

// Focus card hover effect - highlight icon
const focusCards = document.querySelectorAll('.focus-card');

focusCards.forEach(card => {
    const icon = card.querySelector('.focus-icon svg');

    card.addEventListener('mouseenter', () => {
        icon.style.animation = 'iconPulse 0.6s ease-out';
    });

    card.addEventListener('mouseleave', () => {
        icon.style.animation = '';
    });
});

// Add CSS animation for icon pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes iconPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
    }

    .nav-menu a.active {
        color: var(--purple-deep);
    }

    .nav-menu a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);
