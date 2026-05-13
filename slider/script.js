// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Swiper
    const swiper = new Swiper('.mySwiper', {
        // Основные параметры
        loop: true,                      // Бесконечная прокрутка
        autoplay: {
            delay: 3000,                 // Автоматическое переключение каждые 3 секунды
            disableOnInteraction: false, // Не отключать автопрокрутку после ручного листания
        },
        
        // Навигационные стрелки
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Пагинация (точки)
        pagination: {
            el: '.swiper-pagination',
            clickable: true,             // Точки кликабельны
            dynamicBullets: true,        // Красивые динамические точки
        },
        
        // Управление с клавиатуры (стрелки влево/вправо)
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        
        // Адаптивность: количество слайдов на экране (всегда 1)
        slidesPerView: 1,
        spaceBetween: 0,
        
        // Эффекты
        effect: 'slide',                 // Обычный слайд (можно 'fade', 'cube' и др.)
        speed: 500,                      // Скорость анимации (мс)
        
        // Курсор-рука при наведении
        grabCursor: true,
        
        // Управление мышкой (draggable)
        simulateTouch: true,
        touchRatio: 1,
        touchAngle: 45,
        
        // Отладочная информация (если нужно проверить, что Swiper загружен)
        on: {
            init: function() {
                console.log('Swiper инициализирован!');
            },
        }
    });
});