document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.options');
    const container = document.querySelector('.content-container');
    const navTop = nav.offsetTop;

    // 1. Sticky Logic
    function stickyNav() {
        if (window.scrollY >= navTop) {
            const containerRect = container.getBoundingClientRect();
            nav.style.width = container.offsetWidth + 'px';
            nav.style.left = containerRect.left + 'px';
            nav.classList.add('sticky');
        } else {
            nav.style.width = 'auto';
            nav.style.left = 'auto';
            nav.classList.remove('sticky');
        }
    }

    window.addEventListener('scroll', stickyNav);

    // 2. Fixed Offset Click Logic
    document.querySelectorAll('.options a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the nav height (works for mobile too)
                const navHeight = nav.offsetHeight;
                
                // Calculate position relative to the whole document
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetElement.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                
                // Final position: element minus the menu height
                const offsetPosition = elementPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('resize', () => {
        if (nav.classList.contains('sticky')) {
            const containerRect = container.getBoundingClientRect();
            nav.style.width = container.offsetWidth + 'px';
            nav.style.left = containerRect.left + 'px';
        }
    });
});