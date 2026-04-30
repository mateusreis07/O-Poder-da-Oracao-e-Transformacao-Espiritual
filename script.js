document.addEventListener('DOMContentLoaded', () => {
    // 1. Particle Generation
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }

        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 4 + 1; // 1px to 5px
            const left = Math.random() * 100; // 0% to 100%
            const duration = Math.random() * 10 + 5; // 5s to 15s
            const delay = Math.random() * 5; // 0s to 5s
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.animationDuration = `${duration}s, 2s`; // float, glow
            particle.style.animationDelay = `${delay}s, 0s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // 2. Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .fade-slide-up');
    fadeElements.forEach(el => observer.observe(el));

    // 3. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-question');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            const icon = item.querySelector('.toggle-icon');
            
            // Close other open answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                if(ans !== answer) {
                    ans.style.maxHeight = null;
                    ans.previousElementSibling.querySelector('.toggle-icon').textContent = '+';
                }
            });

            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.textContent = '+';
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.textContent = '−';
            }
        });
    });

    // 4. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
