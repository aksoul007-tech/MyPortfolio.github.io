// === Bioluminescent Fireflies Background ===
const canvas = document.getElementById('fireflies');
const ctx = canvas.getContext('2d');

let width, height;
let fireflies = [];
const numFireflies = window.innerWidth < 768 ? 60 : 120; // Adjust for mobile

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

class Firefly {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Size variation
        this.size = Math.random() * 2 + 0.5;
        // Drift speed
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        // Glow opacity
        this.opacity = Math.random();
        this.fadeSpeed = Math.random() * 0.02 + 0.005;
        this.fadingOut = Math.random() > 0.5;
    }

    update() {
        // Movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Pulsing glow effect
        if (this.fadingOut) {
            this.opacity -= this.fadeSpeed;
            if (this.opacity <= 0.1) this.fadingOut = false;
        } else {
            this.opacity += this.fadeSpeed;
            if (this.opacity >= 1) this.fadingOut = true;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Neon green fill
        ctx.fillStyle = `rgba(74, 222, 128, ${this.opacity})`;
        // Glow effect
        ctx.shadowBlur = this.size * 5;
        ctx.shadowColor = 'rgba(74, 222, 128, 0.8)';
        ctx.fill();
    }
}

function initFireflies() {
    resizeCanvas();
    fireflies = [];
    for (let i = 0; i < numFireflies; i++) {
        fireflies.push(new Firefly());
    }
}

function animateFireflies() {
    // Clear canvas with a very slight trail effect
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < fireflies.length; i++) {
        fireflies[i].update();
        fireflies[i].draw();
    }
    requestAnimationFrame(animateFireflies);
}

// Initialize and handle resize
window.addEventListener('resize', () => {
    resizeCanvas();
    // Don't recreate all fireflies on resize to maintain continuity, 
    // just let them wrap to new bounds
});

initFireflies();
animateFireflies();

// === Scroll Reveal Animations ===
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing once revealed
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// === Navigation Scroll Effect ===
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// === Mobile Menu Toggle ===
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple animation for hamburger icon
        hamburger.classList.toggle('toggle');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});
