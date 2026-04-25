// === Bioluminescent Fireflies Background ===
const canvas = document.getElementById('fireflies');
const ctx = canvas.getContext('2d');

let width, height;
let fireflies = [];
const numFireflies = window.innerWidth < 768 ? 80 : 150;

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
        this.size = Math.random() * 4 + 1.5;
        this.speedX = (Math.random() - 0.5) * 2.5;
        this.speedY = (Math.random() - 0.5) * 2.5;
        this.opacity = Math.random();
        this.fadeSpeed = Math.random() * 0.04 + 0.01;
        this.fadingOut = Math.random() > 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

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
        ctx.fillStyle = `rgba(74, 222, 128, ${this.opacity})`;
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
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < fireflies.length; i++) {
        fireflies[i].update();
        fireflies[i].draw();
    }
    requestAnimationFrame(animateFireflies);
}

window.addEventListener('resize', () => {
    resizeCanvas();
});

initFireflies();
animateFireflies();



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
