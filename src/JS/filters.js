document.addEventListener('DOMContentLoaded', () => {
    const blackButton = document.getElementById('black');
    const lightButton = document.getElementById('light');
    function toggleTheme() {
        document.body.classList.toggle('dark-theme'); 

        if (document.body.classList.contains('dark-theme')) {
            blackButton.style.background = "red";
            lightButton.style.backgroundColor = "transparent";
        } else {
            lightButton.style.background = "red";
            blackButton.style.backgroundColor = "transparent";
        }
    }

    blackButton.addEventListener("click", toggleTheme);
    lightButton.addEventListener("click", toggleTheme);
});
document.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
      document.body.classList.add('scrolled');
  } else {
      document.body.classList.remove('scrolled');
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.querySelector('.burger-menu');
  const menu = document.querySelector('.menu-profile');

  burgerMenu.addEventListener('click', function () {
      menu.classList.toggle('active');
  });
});
// document.addEventListener('DOMContentLoaded', function () {
//      const containers = document.querySelectorAll('.container');
//      containers.forEach(container => {
//         const description = container.dataset.description;
//         const all_description = container.dataset.all_description;
//         const full_description = container.dataset.full_description;
//         const tooltip = document.createElement('div');
//         const season = container.dataset.season;
//         tooltip.classList.add('tooltip');

//         tooltip.innerHTML = `
//             <h4>${season}</h4>
//             <p style="font-size:20px">${description}</p>
//             <div class="all_description">
//                 <p>${all_description}</p>
//                 <p>${full_description}</p>
//             </div>
//             <span>Рейтинг: 8.1</span>
//         `;

//         container.appendChild(tooltip);

//         // Обработчики событий на tooltip
//         tooltip.addEventListener('mouseenter', () => { tooltip.style.opacity = 1; });
//         tooltip.addEventListener('mouseleave', () => { tooltip.style.opacity = 0; });
//     });
// });

    document.addEventListener('DOMContentLoaded', function() {
        const slides = document.querySelector('.slides');
        const slideArray = Array.from(slides.children);
        const imagePaths = [
            "/src/img/alya.png",
            "/src/img/dandan.jpg",
            "/src/img/shadow.png",
            "/src/img/new-video.jpg"
        ];
        let currentIndex = 0;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;
        const slideWidth = 100 / slideArray.length;
        let autoScrollInterval;

        // Автопрокрутка
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slideArray.length;
                setPositionByIndex();
            }, 3000); // Автопрокрутка каждые 3 секунды
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        // Установка позиции слайда
        function setPositionByIndex() {
            currentTranslate = currentIndex * -slideWidth;
            slides.style.transform = `translateX(${currentTranslate}%)`;

            // Установка backgroundImage для текущего слайда
            slideArray.forEach((slide, index) => {
                if (index === currentIndex && imagePaths[index]) {
                    slide.style.backgroundImage = `url(${imagePaths[index]})`;
                } else {
                    slide.style.backgroundImage = 'none';
                }
            });
        }

        // Обработчики событий для пролистывания потягиванием
        slides.addEventListener('touchstart', touchStart);
        slides.addEventListener('touchend', touchEnd);
        slides.addEventListener('touchmove', touchMove);

        function touchStart(event) {
            isDragging = true;
            startPos = event.touches[0].clientX;
            animationID = requestAnimationFrame(animation);
        }

        function touchEnd() {
            isDragging = false;
            cancelAnimationFrame(animationID);

            const movedBy = currentTranslate - prevTranslate;
            if (movedBy < -slideWidth && currentIndex < slideArray.length - 1) currentIndex += 1;
            if (movedBy > slideWidth && currentIndex > 0) currentIndex -= 1;

            setPositionByIndex();
            prevTranslate = currentTranslate;
        }

        function touchMove(event) {
            if (isDragging) {
                const currentPosition = event.touches[0].clientX;
                currentTranslate = prevTranslate + (currentPosition - startPos) / window.innerWidth * 100;
            }
        }

        function animation() {
            slides.style.transform = `translateX(${currentTranslate}%)`;
            if (isDragging) requestAnimationFrame(animation);
        }

        // Обработчики событий для кнопок
        document.getElementById('prev').addEventListener('click', () => {
            stopAutoScroll();
            if (currentIndex > 0) {
                currentIndex -= 1;
                setPositionByIndex();
                prevTranslate = currentTranslate;
            }
            startAutoScroll();
        });

        document.getElementById('next').addEventListener('click', () => {
            stopAutoScroll();
            if (currentIndex < slideArray.length - 1) {
                currentIndex += 1;
                setPositionByIndex();
                prevTranslate = currentTranslate;
            }
            startAutoScroll();
        });

        // Вызов функции для отображения начального слайда и запуска автопрокрутки
        setPositionByIndex();
    })
document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('button-filter');
  const filterDropdown = document.getElementById('filterDropdown');
  
  button.addEventListener('click', () => {
    filterDropdown.classList.toggle('show');
  });
  
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.all-filter') && !event.target.closest('.filter-dropdown')) {
      filterDropdown.classList.remove('show');
    }
  });
});

document.addEventListener('DOMContentLoaded', function (){
    const button_profile = document.getElementById('profile_button')
    const profile_dropdown = document.getElementById('account_dropdown')

    button_profile.addEventListener('click', () => {
        profile_dropdown.classList.toggle('show');
    })
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.account_dropdown') && !event.target.closest('.profile_account')){
            profile_dropdown.classList.remove('show')
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
  const videoContainers = document.querySelectorAll('.video-container');

  videoContainers.forEach(container => {
    const poster = container.querySelector('img');
    const video = container.querySelector('video');
  
    container.addEventListener('mouseover', () => {
      poster.style.opacity = 0;
      video.classList.add('active');
      video.play();
    });
  
    container.addEventListener('mouseout', () => {
      video.pause();
      video.currentTime = 0;
      video.classList.remove('active');
      poster.style.opacity = 1;
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const genreFilter = document.getElementById('genreFilter');
    const yearFilter = document.getElementById('yearFilter');
    const seasonFilter = document.getElementById('seasonFilter');
    const applyFiltersButton = document.getElementById('applyFilters');
    const animeCards = document.querySelectorAll('.anime-card');

    applyFiltersButton.addEventListener('click', function(event) {
        event.preventDefault();
        const selectedGenre = genreFilter.value;
        const selectedYear = yearFilter.value;
        const selectedSeason = seasonFilter.value;

        animeCards.forEach(card => {
            const cardGenre = card.getAttribute('data-genre');
            const cardYear = card.getAttribute('data-year');
            const cardSeason = card.getAttribute('data-season');

            if ((selectedGenre === "" || cardGenre === selectedGenre) &&
                (selectedYear === "" || cardYear === selectedYear) &&
                (selectedSeason === "" || cardSeason === selectedSeason)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const moreFiltersButton = document.getElementById('moreFiltersButton');
    const additionalFilters = document.getElementById('additionalFilters');

   moreFiltersButton.addEventListener('click', function() {
        if (additionalFilters.style.display === 'none') {
            additionalFilters.style.display = 'block';
            moreFiltersButton.textContent = 'Скрыть фильтры';
        } else {
            additionalFilters.style.display = 'none';
            moreFiltersButton.textContent = 'Больше фильтров';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const genreInput = document.getElementById('genre');
    const yearInput = document.getElementById('year');

    function applyThemeStyles(inputElement) {
        if (document.body.classList.contains('dark-theme')) {
            inputElement.style.backgroundColor = 'black';
            inputElement.style.color = 'white';
        } else {
            inputElement.style.backgroundColor = 'white';
            inputElement.style.color = 'black';
        }
    }

    genreInput.addEventListener('focus', () => applyThemeStyles(genreInput));
    yearInput.addEventListener('focus', () => applyThemeStyles(yearInput));
});

function showCustomDropdown(id) {
    document.getElementById(id).style.display = 'block';
}

function hideCustomDropdown(id) {
    setTimeout(() => {
        document.getElementById(id).style.display = 'none';
    }, 200); // Задержка, чтобы позволить выбор элемента
}

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const input = this.parentElement.previousElementSibling;
        input.value = this.textContent;
        hideCustomDropdown(this.parentElement.id);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const itemsPerPage = 8;
    const catalog = document.querySelector('.catalog');
    const allCards = Array.from(document.querySelectorAll('.anime-card'));
    let currentPage = 1;
    let isLoading = false;

    // Скрываем все карточки изначально
    allCards.forEach((card, index) => {
        if (index >= itemsPerPage) {
            card.style.display = 'none';
        }
    });

    function showLoading() {
        if (!isLoading) {
            isLoading = true;
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'loading';
            loadingDiv.textContent = 'Загрузка...';
            catalog.appendChild(loadingDiv);
        }
    }

    function hideLoading() {
        const loadingDiv = document.querySelector('.loading');
        if (loadingDiv) {
            loadingDiv.remove();
        }
        isLoading = false;
    }

    function loadMoreItems() {
        if (isLoading) return;

        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollPosition + windowHeight >= documentHeight - 100) {
            showLoading();
            
            setTimeout(() => {
                const start = currentPage * itemsPerPage;
                const end = start + itemsPerPage;

                // Проверяем, есть ли еще карточки для отображения
                if (start < allCards.length) {
                    // Показываем следующие карточки
                    allCards.slice(start, end).forEach(card => {
                        card.style.display = 'block';
                    });
                    currentPage++;
                } else {
                    // Если карточки закончились, убираем обработчик прокрутки
                    window.removeEventListener('scroll', loadMoreItems);
                }

                hideLoading();
            }, 1000);
        }
    }

    // Добавляем слушатель события прокрутки
    window.addEventListener('scroll', loadMoreItems);
});

document.addEventListener('DOMContentLoaded', function() {
    const allCards = document.querySelectorAll('.anime-card');

    // Обработчики событий для карточек аниме
    allCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const tooltip = card.querySelector('.tooltip');
            tooltip.style.display = 'block'; // Показываем всплывающее описание
        });

        card.addEventListener('mouseleave', () => {
            const tooltip = card.querySelector('.tooltip');
            tooltip.style.display = 'none'; // Скрываем всплывающее описание
        });
    });
});
