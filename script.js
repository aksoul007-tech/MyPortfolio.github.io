// === Bioluminescent Fireflies Background ===
const canvas = document.getElementById('fireflies');
const ctx = canvas.getContext('2d');

let width, height;
let fireflies = [];
const numFireflies = window.innerWidth < 768 ? 80 : 150; // Increased for more density

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
        // Size variation (bigger now)
        this.size = Math.random() * 4 + 1.5;
        
        // Base Drift speed (faster now)
        this.baseSpeedX = (Math.random() - 0.5) * 2.5;
        this.baseSpeedY = (Math.random() - 0.5) * 2.5;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
        
        // Glow opacity
        this.opacity = Math.random();
        this.baseFadeSpeed = Math.random() * 0.04 + 0.01;
        this.fadeSpeed = this.baseFadeSpeed;
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
        // Massive Glow effect
        ctx.shadowBlur = this.size * 15;
        ctx.shadowColor = 'rgba(74, 222, 128, 1)';
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
});

initFireflies();
animateFireflies();

// === Toggle Animation System Power Logic ===
let isHyperMode = false;
const toggleSwitch = document.getElementById('power-toggle');
const powerStatusText = document.getElementById('power-status');

if (toggleSwitch) {
    toggleSwitch.addEventListener('click', () => {
        toggleSwitch.classList.toggle('active');
        isHyperMode = !isHyperMode;
        
        if (isHyperMode) {
            powerStatusText.innerText = "OVERDRIVE";
            powerStatusText.style.color = "var(--accent)";
            powerStatusText.style.textShadow = "0 0 15px var(--accent-glow)";
        } else {
            powerStatusText.innerText = "Normal";
            powerStatusText.style.color = "var(--text-muted)";
            powerStatusText.style.textShadow = "none";
        }

        // Apply effect to fireflies
        fireflies.forEach(f => {
            if (isHyperMode) {
                // Move extremely fast, blink faster
                f.speedX = f.baseSpeedX * 5;
                f.speedY = f.baseSpeedY * 5;
                f.fadeSpeed = f.baseFadeSpeed * 3;
            } else {
                // Return to normal
                f.speedX = f.baseSpeedX;
                f.speedY = f.baseSpeedY;
                f.fadeSpeed = f.baseFadeSpeed;
            }
        });
    });
}

// === Scroll Reveal Animations ===
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
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
