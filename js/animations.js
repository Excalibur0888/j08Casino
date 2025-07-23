// Casino Animation Effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js for background
    initializeParticles();
    
    // Add floating animation to some elements
    const floatingElements = document.querySelectorAll('.float');
    if (floatingElements.length > 0) {
        floatingElements.forEach((element, index) => {
            // Stagger the animations
            element.style.animationDelay = `${index * 0.2}s`;
        });
    }
    
    // Shine effect for CTA buttons
    const shineElements = document.querySelectorAll('.shine');
    if (shineElements.length > 0) {
        shineElements.forEach((element, index) => {
            // Stagger the animations
            element.style.animationDelay = `${index * 3}s`;
        });
    }
    
    // Animate the numbers in the jackpot counter with slot machine effect
    const counterValue = document.querySelector('.counter-value');
    if (counterValue) {
        animateCounter();
    }
    
    function animateCounter() {
        const originalText = counterValue.textContent;
        const numericValue = originalText.replace(/[^\d]/g, '');
        
        if (numericValue.length > 0) {
            // Clear current content
            counterValue.innerHTML = '';
            
            // Add currency symbol
            const currencySymbol = document.createElement('span');
            currencySymbol.textContent = '৳';
            counterValue.appendChild(currencySymbol);
            
            // Create slot digits
            for (let i = 0; i < numericValue.length; i++) {
                const digitContainer = document.createElement('span');
                digitContainer.className = 'slot-digit';
                
                const digitValue = document.createElement('span');
                digitValue.className = 'slot-digit-animation';
                digitValue.textContent = numericValue[i];
                digitValue.style.animationDelay = `${i * 0.1}s`;
                
                digitContainer.appendChild(digitValue);
                counterValue.appendChild(digitContainer);
            }
        }
    }
    
    // Add visual feedback when buttons are clicked
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Add card flip animation to any element with flip-card class
    const flipCards = document.querySelectorAll('.flip-card');
    
    if (flipCards.length > 0) {
        flipCards.forEach(card => {
            // Create inner, front and back elements if they don't exist
            if (!card.querySelector('.flip-card-inner')) {
                const content = card.innerHTML;
                card.innerHTML = '';
                
                const inner = document.createElement('div');
                inner.className = 'flip-card-inner';
                
                const front = document.createElement('div');
                front.className = 'flip-card-front';
                front.innerHTML = content;
                
                const back = document.createElement('div');
                back.className = 'flip-card-back';
                back.innerHTML = '<h3>Exclusive Bonus</h3><p>Sign up now to claim your welcome bonus!</p><a href="https://negolous.com/1Jsc6mkr" class="btn btn-light">Join Now</a>';
                
                inner.appendChild(front);
                inner.appendChild(back);
                card.appendChild(inner);
            }
        });
    }
    
    // Animate the winners ticker
    const winnersTicker = document.querySelector('.winners-ticker');
    
    if (winnersTicker) {
        // Adjust animation speed based on content length
        const tickerItems = winnersTicker.querySelectorAll('span');
        let totalWidth = 0;
        
        tickerItems.forEach(item => {
            totalWidth += item.offsetWidth + parseInt(window.getComputedStyle(item).paddingRight);
        });
        
        // Calculate optimal animation duration (longer content = longer duration)
        const containerWidth = winnersTicker.parentElement.offsetWidth;
        const screenWidth = window.innerWidth;
        const optimalDuration = Math.max((totalWidth / screenWidth) * 15, 20); // At least 20 seconds
        
        // Apply custom animation duration
        winnersTicker.style.animationDuration = `${optimalDuration}s`;
    }
    
    // Animated text effects for headings
    const headings = document.querySelectorAll('h1, h2');
    
    if (headings.length > 0) {
        headings.forEach(heading => {
            if (!heading.classList.contains('animated-text') && Math.random() < 0.3) { // 30% chance to animate
                heading.classList.add('animated-text');
            }
        });
    }
    
    // Casino chip animation for feature icons
    const featureIcons = document.querySelectorAll('.feature-icon, .option-icon, .provider-icon');
    
    if (featureIcons.length > 0) {
        featureIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.2}s`;
            icon.addEventListener('mouseover', function() {
                this.classList.add('spin-once');
                
                setTimeout(() => {
                    this.classList.remove('spin-once');
                }, 1000);
            });
        });
    }
    
    // Add spinning animation to casino-related icons on hover
    document.querySelectorAll('.fas.fa-dice, .fas.fa-spinner, .fas.fa-coins').forEach(icon => {
        icon.addEventListener('mouseover', function() {
            this.style.animation = 'spin 1s ease-in-out';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Animate numbers in stats/counters
    const numberElements = document.querySelectorAll('.stat-number, .counter');
    
    if (numberElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        numberElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    function animateNumber(element) {
        const finalValue = parseInt(element.getAttribute('data-value') || element.innerText, 10);
        let currentValue = 0;
        const duration = 2000; // 2 seconds
        const interval = 16; // 60fps
        const steps = duration / interval;
        const increment = finalValue / steps;
        
        const counter = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= finalValue) {
                element.innerText = finalValue;
                clearInterval(counter);
            } else {
                element.innerText = Math.floor(currentValue);
            }
        }, interval);
    }
    
    // Initialize Particles.js
    function initializeParticles() {
        if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 100,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": ["#7b2cbf", "#5a189a", "#f72585", "#480ca8"]
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 0.5,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#7b2cbf",
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 0.8,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": true,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 0.6
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 100,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }
    }
});

// Define additional animation keyframes
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes spin-once {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .spin-once {
            animation: spin-once 1s ease-in-out forwards;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .clicked {
            animation: shake 0.3s ease-in-out;
        }
        
        /* Fade-in animation for page load */
        body.loaded .hero-content h2,
        body.loaded .hero-content h3,
        body.loaded .hero-content p,
        body.loaded .hero-buttons {
            opacity: 0;
            animation: fade-in 1s forwards;
        }
        
        body.loaded .hero-content h2 { animation-delay: 0.2s; }
        body.loaded .hero-content h3 { animation-delay: 0.4s; }
        body.loaded .hero-content p { animation-delay: 0.6s; }
        body.loaded .hero-buttons { animation-delay: 0.8s; }
        
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Animation for elements coming into view */
        .feature-card, .promo-box, .game-card, .testimonial-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.visible, .promo-box.visible, .game-card.visible, .testimonial-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Casino chip stack effect */
        .stack-effect {
            position: relative;
        }
        
        .stack-effect::before,
        .stack-effect::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: inherit;
            z-index: -1;
        }
        
        .stack-effect::before {
            top: 3px;
            opacity: 0.7;
        }
        
        .stack-effect::after {
            top: 6px;
            opacity: 0.4;
        }
        
        /* Glowing effect for text */
        .glow-text {
            text-shadow: 0 0 10px rgba(123, 44, 191, 0.7), 0 0 20px rgba(123, 44, 191, 0.5);
            animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
            from {
                text-shadow: 0 0 10px rgba(123, 44, 191, 0.7), 0 0 20px rgba(123, 44, 191, 0.5);
            }
            to {
                text-shadow: 0 0 15px rgba(247, 37, 133, 0.8), 0 0 25px rgba(247, 37, 133, 0.6);
            }
        }
    `;
    
    document.head.appendChild(styleElement);
} 