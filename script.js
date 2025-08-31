// Portfolio Bento Box JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the portfolio
    initPortfolio();
    
    // Add event listeners
    addEventListeners();
    
    // Animate skill bars on scroll
    animateSkillBars();
});

function initPortfolio() {
    console.log('Portfolio initialized');
    
    // Add loading animation to cards
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function addEventListeners() {
    // Card hover effects
    const cards = document.querySelectorAll('.bento-card');
    
    cards.forEach(card => {
        // Hover expansion effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.03)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
        
        // Click to expand (optional feature)
        card.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.03)';
            }, 150);
        });
        
        // Keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Contact button functionality
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showContactModal();
        });
    }
    
    // Social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // You can add actual navigation here
            console.log('Social link clicked:', this.href);
        });
    });
    
    // Interest tags
    const interestTags = document.querySelectorAll('.interest-tag');
    interestTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function animateSkillBars() {
    // Intersection Observer for skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                
                // Reset width to 0 for animation
                skillBar.style.width = '0%';
                
                // Animate to target width
                setTimeout(() => {
                    skillBar.style.width = width;
                    skillBar.style.transition = 'width 1.5s ease-out';
                }, 100);
                
                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

function showContactModal() {
    // Create a simple contact modal
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Get In Touch</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <form class="contact-form">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Send Message</button>
                </form>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .contact-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            padding: 24px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease-out;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .modal-header h3 {
            margin: 0;
            color: #374151;
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #6B7280;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .close-btn:hover {
            background: #F3F4F6;
            color: #374151;
        }
        
        .form-group {
            margin-bottom: 16px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 6px;
            color: #374151;
            font-weight: 500;
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #E5E7EB;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .submit-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
        }
        
        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(20px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
    
    // Form submission
    const form = modal.querySelector('.contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Here you would typically send the data to your server
        console.log('Contact form submitted:', { name, email, message });
        
        // Show success message
        showSuccessMessage(modal);
    });
}

function showSuccessMessage(modal) {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
            <i class="fas fa-check-circle" style="font-size: 48px; color: #10B981; margin-bottom: 16px;"></i>
            <h3 style="color: #374151; margin-bottom: 8px;">Message Sent!</h3>
            <p style="color: #6B7280; margin-bottom: 24px;">Thank you for reaching out. I'll get back to you soon!</p>
            <button class="submit-btn" onclick="this.closest('.contact-modal').remove()">Close</button>
        </div>
    `;
}

// Add smooth scroll behavior for the entire page
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading state management
window.addEventListener('load', function() {
    // Remove loading animation after page loads
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
        card.style.animation = 'none';
    });
});

// Add scroll-based animations
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.bento-card');
    const windowHeight = window.innerHeight;
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 150;
        
        if (cardTop < windowHeight - cardVisible) {
            card.classList.add('animate');
        }
    });
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    const cards = document.querySelectorAll('.bento-card');
    
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Add performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations can go here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);
