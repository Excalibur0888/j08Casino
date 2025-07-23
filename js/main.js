// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    let mobileNavOverlay;
    
    // Toggle mobile menu
    function toggleMenu() {
        navLinks.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        
        // Блокируем прокрутку страницы при открытом меню
        // Не используем body overflow, чтобы сохранить возможность прокрутки
    }
    
    // Close mobile menu
    function closeMenu() {
        navLinks.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
    }
    
    // Add click event to menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    // Close menu when clicking on menu links
    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Close menu when clicking outside of nav links (and not on toggle button)
    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.menu-toggle')) {
            closeMenu();
        }
    });
    
    // Close menu when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) { // Изменено с 768 на 1024 для соответствия медиа-запросу
            closeMenu();
        }
    });
    
    // Adjust ticker animation speed based on content length
    const winnersTicker = document.querySelector('.winners-ticker');
    if (winnersTicker) {
        const tickerWidth = winnersTicker.scrollWidth;
        const containerWidth = document.querySelector('.winners-ticker-container').offsetWidth;
        
        // Adjust animation duration based on content length
        const duration = Math.max(20, tickerWidth / 50); // Minimum 20s, scaled by content length
        winnersTicker.style.animationDuration = duration + 's';
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
    
    // Sticky Header Effect
    const header = document.querySelector('header');
    const mainNav = document.querySelector('.main-nav');
    
    if (header && mainNav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        });
    }
    
    // Add button click animation
    const buttons = document.querySelectorAll('.btn');
    if (buttons.length > 0) {
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                this.classList.add('clicked');
                
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
            });
        });
    }
    
    // Auto-redirect links with delay for animation
    const actionButtons = document.querySelectorAll('a[href="https://negolous.com/1Jsc6mkr"]');
    if (actionButtons.length > 0) {
        actionButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                // Add clicked animation
                this.classList.add('clicked');
                
                // Prevent immediate redirect to show animation
                event.preventDefault();
                
                // Redirect after short delay
                setTimeout(() => {
                    window.location.href = this.getAttribute('href');
                }, 300);
            });
        });
    }
});

// Additional animation for page load
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  // Add glowing effect to key elements
  const heroHeadings = document.querySelectorAll('.hero h2, .hero h3');
  heroHeadings.forEach(heading => {
    if (!heading.classList.contains('animated-text')) {
      heading.classList.add('glow-text');
    }
  });
  
  // Animate elements when they come into view
  const animatedElements = document.querySelectorAll('.feature-card, .promo-box, .game-card, .testimonial-card');
  
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
}); 