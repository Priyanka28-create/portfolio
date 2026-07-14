// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    themeToggle.textContent = body.classList.contains('light') ? '☀️' : '🌙';
});

// Typing Effect
const texts = [
    'Full Stack Developer',
    'Java Spring Boot Dev',
    'React Developer',
    'Problem Solver',
    'UI/UX Enthusiast'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function type() {
    const current = texts[textIndex];
    if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === current.length) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    setTimeout(type, isDeleting ? 50 : 100);
}

type();

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .skill-card').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.1) + 's';
    observer.observe(el);
});

// Skill Bar Animation
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.bar-fill').forEach((bar, i) => {
                setTimeout(() => {
                    bar.style.width = bar.dataset.width + '%';
                }, i * 200);
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-bars').forEach(el => barObserver.observe(el));

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.style.padding = window.scrollY > 50 ? '10px 40px' : '16px 40px';
});

// Active Nav Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = '#7c3aed';
        }
    });
});

// Cursor Glow
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    scrollProgress.style.width = ((window.scrollY / scrollHeight) * 100) + '%';
});

// Counter Animation
function animateCounter(el, target) {
    let current = 0;
    const num = parseInt(target);
    const suffix = target.toString().replace(/[0-9]/g, '');
    const increment = num / 40;
    const counter = setInterval(() => {
        current += increment;
        if (current >= num) {
            el.textContent = num + suffix;
            clearInterval(counter);
        } else {
            el.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            animateCounter(entry.target, entry.target.textContent.trim());
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat h3').forEach(el => statObserver.observe(el));

// Project Card 3D Tilt Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'all 0.4s ease';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'box-shadow 0.3s, border-color 0.3s, transform 0.1s';
    });
});

// Skill card stagger animation
document.querySelectorAll('.skill-card').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.05) + 's';
});

// Contact Form - opens the visitor's email client with a prefilled message
const CONTACT_EMAIL = 'priyankarajendran70659@gmail.com';
const contactSendBtn = document.getElementById('contactSendBtn');

if (contactSendBtn) {
    contactSendBtn.addEventListener('click', () => {
        const nameEl = document.getElementById('contactName');
        const emailEl = document.getElementById('contactEmail');
        const messageEl = document.getElementById('contactMessage');
        const statusEl = document.getElementById('contactStatus');

        const name = nameEl.value.trim();
        const email = emailEl.value.trim();
        const message = messageEl.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message) {
            statusEl.textContent = 'Please fill in your name, email, and message.';
            statusEl.style.color = '#ef4444';
            return;
        }
        if (!emailPattern.test(email)) {
            statusEl.textContent = 'Please enter a valid email address.';
            statusEl.style.color = '#ef4444';
            return;
        }

        const subject = `Portfolio contact from ${name}`;
        const body = `${message}\n\n— ${name} (${email})`;
        const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        statusEl.textContent = 'Opening your email app to send this message…';
        statusEl.style.color = '#22c55e';
    });
}