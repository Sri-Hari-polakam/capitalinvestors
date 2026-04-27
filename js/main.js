document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize AOS Animations
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }

    // Navbar Scroll Effect
    const nav = document.getElementById('navbar');
    if (nav) {
        // Only pages with a hero section (index.html) should start transparent
        const isTransparentNavbar = nav.classList.contains('nav-transparent');
        
        const handleScroll = () => {
            if (window.scrollY > 50) {
                nav.classList.add('glass-dark', 'py-4');
                nav.classList.remove('py-6');
                if (isTransparentNavbar) nav.classList.remove('bg-transparent');
            } else {
                if (isTransparentNavbar) {
                    nav.classList.remove('glass-dark', 'py-4');
                    nav.classList.add('py-6', 'bg-transparent');
                } else {
                    nav.classList.add('glass-dark', 'py-4');
                    nav.classList.remove('py-6');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }

    if (closeMenuBtn && mobileMenu) {
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close menu on link click
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    mobileLinks?.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your message has been sent successfully. We will get back to you soon.');
            e.target.reset();
        });
    }
});

