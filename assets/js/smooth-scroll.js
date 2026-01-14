document.addEventListener('DOMContentLoaded', () => {

    // при загрузке страницы
    window.addEventListener('load', () => {
        if (window.location.hash) {
            return;
        }
        window.scrollTo(0, 0);
    });

    function smoothScrollTo(targetY, duration = 900) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        let startTime = null;

        function easeInOutCubic(t) {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);

            window.scrollTo(0, startY + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();

            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;

            const targetRect = target.getBoundingClientRect();
            const targetY =
                targetRect.top +
                window.pageYOffset -
                (window.innerHeight / 2) +
                (targetRect.height / 2);

            smoothScrollTo(targetY, 1200);
        });
    });

    console.log('Smooth scroll initialized');
});


// Scroll to top button (smooth)

const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    // кастомный плавный подъём
    scrollToTopBtn.addEventListener('click', () => {
        smoothScrollToTop(1600);
    });

}
// Smooth scroll function

function smoothScrollToTop(duration = 1200) {
    const startY = window.pageYOffset;
    const startTime = performance.now();

    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startY * (1 - ease));

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}