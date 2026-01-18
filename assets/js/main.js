// БЛОК О НАС
document.addEventListener('DOMContentLoaded', () => {

    // Stats counter animation
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    let hasAnimated = false;

    function animateCounters() {
        if (hasAnimated) return;
        hasAnimated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.dataset.counter, 10);
            const suffix = counter.dataset.suffix || '';
            let current = 0;

            const duration = 2600; // общая длительность анимации
            const fps = 60;
            const totalFrames = Math.round((duration / 1000) * fps);
            const increment = target / totalFrames;

            let frame = 0;

            function update() {
                frame++;
                current += increment;

                if (frame < totalFrames) {
                    counter.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target + suffix;
                }
            }

            update();
        });
    }

    // Запуск при появлении блока
    const statsSection = document.querySelector('#about');

    if (!statsSection) return;

    const observer = new IntersectionObserver(
        entries => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect(); // запуск ТОЛЬКО ОДИН РАЗ
            }
        },
        {
            threshold: 0.4
        }
    );

    observer.observe(statsSection);

});


// БЛОК КУРСЫ
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');

document.querySelectorAll('#courses img').forEach(img => {
    img.style.cursor = 'pointer';

    img.addEventListener('click', () => {
        modalImage.src = img.src;
        modalImage.alt = img.alt;

        modal.classList.remove('opacity-0', 'pointer-events-none');
        modalImage.classList.remove('scale-95');
        modalImage.classList.add('scale-100');
    });
});

// закрытие по клику на фон
modal.addEventListener('click', () => {
    closeModal();
});

// закрытие по ESC
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

function closeModal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalImage.classList.remove('scale-100');
    modalImage.classList.add('scale-95');
}


// БЛОК ПРОМО-БАР
document.addEventListener('DOMContentLoaded', () => {
    const promo = document.getElementById('promoBar');
    if (!promo) return;

    let animated = false;

    window.addEventListener('scroll', () => {
        if (animated) return;

        const rect = promo.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // когда верх блока вошёл в экран хотя бы на 30%
        if (rect.top < windowHeight * 0.7) {
            promo.classList.remove('-translate-x-full');
            promo.classList.add('translate-x-0');
            animated = true;
        }
    });
});


// БЛОК ТАРИФЫ
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('#pricing .pricing-card');
    if (!cards.length) return;

    let activeIndex = [...cards].findIndex(card =>
        card.classList.contains('is-active')
    );
    if (activeIndex === -1) activeIndex = 0;

    function updatePricingClasses() {
        cards.forEach((card, index) => {
            card.classList.remove(
                'is-active',
                'is-left',
                'is-right',
                'is-hidden'
            );

            if (index === activeIndex) {
                card.classList.add('is-active');
            } else if (index === (activeIndex - 1 + cards.length) % cards.length) {
                card.classList.add('is-left');
            } else if (index === (activeIndex + 1) % cards.length) {
                card.classList.add('is-right');
            } else {
                card.classList.add('is-hidden');
            }
        });
    }

    updatePricingClasses();

    // 👇 ВАЖНО: делаем функции глобальными
    window.nextPricingCard = function () {
        activeIndex = (activeIndex + 1) % cards.length;
        updatePricingClasses();
    };

    window.prevPricingCard = function () {
        activeIndex = (activeIndex - 1 + cards.length) % cards.length;
        updatePricingClasses();
    };

    // Клик по карточке
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (index === activeIndex) return;
            activeIndex = index;
            updatePricingClasses();
        });
    });
});


// FAQ
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');

        button.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');

            // закрываем все
            faqItems.forEach(i => {
                i.classList.remove('is-open');
            });

            // если был закрыт — открываем
            if (!isOpen) {
                item.classList.add('is-open');
            }
        });
    });
});


// МОДАЛЬНОЕ ОКНО КОНТАКТОВ
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contacts form');
    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('closeSuccessModal');

    if (!form || !modal || !closeBtn) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        // показываем модалку
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.querySelector('div').classList.remove('scale-95');

        // очищаем форму
        form.reset();
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.querySelector('div').classList.add('scale-95');
    });

    // закрытие по клику на затемнение
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.add('opacity-0', 'pointer-events-none');
            modal.querySelector('div').classList.add('scale-95');
        }
    });
});


// ТЕЛЕФОН
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) return;

    function formatPhone(value) {
        // оставляем только цифры
        let digits = value.replace(/\D/g, '');

        // всегда начинаем с 7
        if (digits.startsWith('8')) digits = '7' + digits.slice(1);
        if (!digits.startsWith('7')) digits = '7' + digits;

        digits = digits.slice(0, 11); // +7 и 10 цифр

        let formatted = '+7';

        if (digits.length > 1) {
            formatted += ' (' + digits.slice(1, 4);
        }
        if (digits.length >= 4) {
            formatted += ') ' + digits.slice(4, 7);
        }
        if (digits.length >= 7) {
            formatted += '-' + digits.slice(7, 9);
        }
        if (digits.length >= 9) {
            formatted += '-' + digits.slice(9, 11);
        }

        return formatted;
    }

    phoneInput.addEventListener('input', () => {
        phoneInput.value = formatPhone(phoneInput.value);
    });

    phoneInput.addEventListener('focus', () => {
        if (!phoneInput.value) {
            phoneInput.value = '+7 ';
        }
    });

    phoneInput.addEventListener('keydown', (e) => {
        if (
            phoneInput.selectionStart <= 2 &&
            (e.key === 'Backspace' || e.key === 'Delete')
        ) {
            e.preventDefault();
        }
    });
});


// ПОДПИСКА
document.addEventListener('DOMContentLoaded', () => {
    const subscribeBtn = document.getElementById('subscribeBtn');
    const subscribeForm = document.getElementById('subscribeForm');
    const subscribeSuccess = document.getElementById('subscribeSuccess');

    if (!subscribeBtn) return;

    subscribeBtn.addEventListener('click', (e) => {
        e.preventDefault();

        subscribeForm.classList.add('hidden');
        subscribeSuccess.classList.remove('hidden');
    });
});



// BURGER MENU                  
document.addEventListener('DOMContentLoaded', () => {
    const burgerButton = document.getElementById('burgerButton');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!burgerButton || !mobileMenu) return;

    // открыть / закрыть меню
    burgerButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-open');
    });

    // закрытие меню при клике на ссылку
    const menuLinks = mobileMenu.querySelectorAll('a');

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('is-open');
        });
    });
});