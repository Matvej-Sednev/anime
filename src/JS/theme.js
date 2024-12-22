
// JavaScript для переключения активной кнопки
document.addEventListener('DOMContentLoaded', () => {
    const sectionButtons = document.querySelectorAll('.section-button');

    sectionButtons.forEach(button => {
        button.addEventListener('click', () => {
            sectionButtons.forEach(btn => btn.classList.remove('active')); // Убираем активный класс у всех кнопок
            button.classList.add('active'); // Добавляем активный класс к нажатой кнопке
        });
    });
}); 