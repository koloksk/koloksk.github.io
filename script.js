// Scroll progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Section animation
const sections = document.querySelectorAll('.section-animate');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('#projectCarousel');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    const items = carousel.querySelectorAll('.carousel-item');
    const imageModal = document.querySelector('#imageModal');
    const modalImage = imageModal.querySelector('.fullscreen-img');
    let modalInstance; 

    items.forEach((item, index) => {
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.dataset.bsTarget = '#projectCarousel';
        indicator.dataset.bsSlideTo = index;
        indicator.ariaLabel = `Slide ${index + 1}`;
        if (index === 0) indicator.classList.add('active');
        indicatorsContainer.appendChild(indicator);
    });

    carousel.addEventListener('slid.bs.carousel', () => {
        const activeItem = carousel.querySelector('.carousel-item.active');
        const activeIndex = Array.from(items).indexOf(activeItem);
        const indicators = indicatorsContainer.querySelectorAll('button');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndex);
            indicator.setAttribute('aria-current', index === activeIndex);
        });
    });

    carousel.addEventListener('click', (e) => {
        if (e.target.classList.contains('project-img')) {
            e.preventDefault();
            modalImage.src = e.target.dataset.imgSrc;
            modalImage.alt = e.target.alt;

            modalInstance = new bootstrap.Modal(imageModal, {
                backdrop: 'static',
                keyboard: true
            });
            modalInstance.show();
        }
    });

    document.addEventListener('click', (e) => {
        const isModalOpen = imageModal.classList.contains('show');
        const isClickInsideImage = modalImage.contains(e.target);
        if (isModalOpen && !isClickInsideImage) {
            modalInstance?.hide();
        }
    });
});
