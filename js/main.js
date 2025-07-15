// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbar = document.querySelector('.navbar');
    
    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#home') {
                // Handle home link - scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add active class to current navigation item
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        let currentSection = 'home';
        
        // Simple approach: check which section is closest to the top of viewport
        const sections = document.querySelectorAll('section[id]');
        let minDistance = Infinity;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const distance = Math.abs(scrollTop - sectionTop);
            
            if (distance < minDistance) {
                minDistance = distance;
                currentSection = section.getAttribute('id');
            }
        });
        
        // If we're at the very top, set to home
        if (scrollTop < 200) {
            currentSection = 'home';
        }
        
        // Update active class on nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            if ((currentSection === 'home' && linkHref === '#home') || 
                linkHref === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        // Navbar style change on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Add animation to navbar on page load
    setTimeout(() => {
        navbar.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
    }, 300);
});

// Initialize navbar styles
const navbar = document.querySelector('.navbar');
if (navbar) {
    navbar.style.transform = 'translateY(-20px)';
    navbar.style.opacity = '0';
    navbar.style.transition = 'all 0.5s ease-out';
}
