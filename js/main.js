document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
    const categoryButtons = document.querySelectorAll('.menu__category-btn');
    const menuCategories = document.querySelectorAll('.menu__category');
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                menuCategories.forEach(category => {
                    category.style.display = 'none';
                });
                const categoryId = button.getAttribute('data-category');
                document.getElementById(categoryId).style.display = 'flex';
            });
        });
    }
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                guests: document.getElementById('guests').value,
                comment: document.getElementById('comment').value
            };
            if (!validateBookingForm(formData)) {
                return;
            }
            console.log('Данные формы:', formData);
            alert('Спасибо за бронирование! Мы свяжемся с вами в ближайшее время для подтверждения.');
            bookingForm.reset();
        });
    }
    function validateBookingForm(data) {
        if (data.name.length < 2) {
            alert('Пожалуйста, введите корректное имя');
            return false;
        }
        const phoneRegex = /^\+?[0-9]{10,12}$/;
        if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
            alert('Пожалуйста, введите корректный номер телефона');
            return false;
        }
        if (data.email && !data.email.includes('@')) {
            alert('Пожалуйста, введите корректный email');
            return false;
        }
        const selectedDate = new Date(data.date);
        const today = new Date();
        if (selectedDate < today) {
            alert('Пожалуйста, выберите будущую дату');
            return false;
        }
        if (!data.time) {
            alert('Пожалуйста, выберите время');
            return false;
        }
        if (!data.guests) {
            alert('Пожалуйста, выберите количество гостей');
            return false;
        }
        return true;
    }
    const lightGallery = document.getElementById('lightgallery');
    if (lightGallery) {
        lightGallery.addEventListener('click', function(e) {
            e.preventDefault();
        });
        const gallery = new LightGallery(lightGallery, {
            selector: '.gallery__item',
            speed: 500,
            backdropDuration: 400,
            hideControlOnEnd: true
        });
    }
    const galleryCategoryButtons = document.querySelectorAll('.gallery__category-btn');
    const galleryItems = document.querySelectorAll('.gallery__item');
    if (galleryCategoryButtons.length > 0) {
        galleryCategoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                galleryCategoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const category = button.getAttribute('data-category');
                galleryItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    const contactForm = document.querySelector('.contacts__form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            let isValid = true;
            const errors = {};
            if (!data.name.trim()) {
                errors.name = 'Пожалуйста, введите ваше имя';
                isValid = false;
            }
            if (!data.email.trim()) {
                errors.email = 'Пожалуйста, введите ваш email';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                errors.email = 'Пожалуйста, введите корректный email';
                isValid = false;
            }
            if (!data.subject.trim()) {
                errors.subject = 'Пожалуйста, введите тему сообщения';
                isValid = false;
            }
            if (!data.message.trim()) {
                errors.message = 'Пожалуйста, введите ваше сообщение';
                isValid = false;
            }
            Object.keys(errors).forEach(field => {
                const input = contactForm.querySelector(`[name="${field}"]`);
                const errorElement = input.parentElement.querySelector('.error-message') || 
                    document.createElement('div');   
                errorElement.className = 'error-message';
                errorElement.textContent = errors[field];
                if (!input.parentElement.querySelector('.error-message')) {
                    input.parentElement.appendChild(errorElement);
                }
                input.classList.add('error');
            });
            if (!isValid) {
                return;
            }
            const submitButton = contactForm.querySelector('.contacts__submit');
            submitButton.disabled = true;
            submitButton.textContent = 'Отправка...';
            setTimeout(() => {
                contactForm.reset();
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Спасибо! Ваше сообщение отправлено.';
                contactForm.insertBefore(successMessage, contactForm.firstChild);
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
                submitButton.disabled = false;
                submitButton.textContent = 'Отправить';
            }, 1000);
        });
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');
                const errorMessage = input.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        });
    }
    const mainHeroSlider = document.querySelector('.hero__slider');
    if (mainHeroSlider) {
        const slides = mainHeroSlider.querySelectorAll('.hero__slide');
        const prevButton = document.querySelector('.hero__control--prev');
        const nextButton = document.querySelector('.hero__control--next');
        let currentSlide = 0;
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);
        }
        setInterval(nextSlide, 5000);
    }
    const testimonialsSlider = document.querySelector('.testimonials__slider');
    if (testimonialsSlider) {
        const slides = testimonialsSlider.querySelectorAll('.testimonials__slide');
        const prevButton = document.querySelector('.testimonials__control--prev');
        const nextButton = document.querySelector('.testimonials__control--next');
        let currentSlide = 0;
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);
        }
        setInterval(nextSlide, 7000);
    }
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.features__item, .news__item, .about__content, .about__image');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;      
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    document.addEventListener('DOMContentLoaded', () => {
        const elements = document.querySelectorAll('.features__item, .news__item, .about__content, .about__image');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll();
    });
}); 