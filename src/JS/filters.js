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
            }, 3000); 
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }


        function setPositionByIndex() {
            currentTranslate = currentIndex * -slideWidth;
            slides.style.transform = `translateX(${currentTranslate}%)`;


            slideArray.forEach((slide, index) => {
                if (index === currentIndex && imagePaths[index]) {
                    slide.style.backgroundImage = `url(${imagePaths[index]})`;
                } else {
                    slide.style.backgroundImage = 'none';
                }
            });
        }


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
    const profileButton = document.getElementById('profile_button');
    const accountDropdown = document.getElementById('account_dropdown');
    const themeToggleInAccount = document.querySelector('.inside_account #theme-toggle');

    profileButton.addEventListener('click', () => {
        accountDropdown.style.display = accountDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Обработчик для переключения темы внутри выпадающего меню аккаунта
    themeToggleInAccount.addEventListener('click', function(e) {
        e.stopPropagation(); // Предотвращаем закрытие меню при клике
        const body = document.body;
        const themeIcon = this.previousElementSibling;
        
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            this.textContent = 'Тёмная тема';
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            body.classList.add('dark-theme');
            this.textContent = 'Светлая тема';
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Закрытие выпадающего меню при клике вне его
    document.addEventListener('click', (event) => {
        if (!profileButton.contains(event.target) && !accountDropdown.contains(event.target)) {
            accountDropdown.style.display = 'none';
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
    }, 200); 
}

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const input = this.parentElement.previousElementSibling;
        input.value = this.textContent;
        hideCustomDropdown(this.parentElement.id);
    });
});

//document.addEventListener('DOMContentLoaded', function() {
    // const itemsPerPage = 8;
    // const catalog = document.querySelector('.catalog');
    // const allCards = Array.from(document.querySelectorAll('.anime-card'));
    // let currentPage = 1;
    // let isLoading = false;

    
    // allCards.forEach((card, index) => {
    //     if (index >= itemsPerPage) {
    //         card.style.display = 'none';
    //     }
    // });

    // function showLoading() {
    //     if (!isLoading) {
    //         isLoading = true;
    //         const loadingDiv = document.createElement('div');
    //         loadingDiv.className = 'loading';
    //         loadingDiv.textContent = 'Загрузка...';
    //         catalog.appendChild(loadingDiv);
    //     }
    // }

    // function hideLoading() {
    //     const loadingDiv = document.querySelector('.loading');
    //     if (loadingDiv) {
    //         loadingDiv.remove();
    //     }
    //     isLoading = false;
    // }

    // function loadMoreItems() {
    //     if (isLoading) return;

    //     const scrollPosition = window.scrollY;
    //     const windowHeight = window.innerHeight;
    //     const documentHeight = document.documentElement.scrollHeight;

    //     if (scrollPosition + windowHeight >= documentHeight - 10) {
            
    //         setTimeout(() => {
    //             const start = currentPage * itemsPerPage;
    //             const end = start + itemsPerPage;

                
    //             if (start < allCards.length) {
                
    //                 allCards.slice(start, end).forEach(card => {
    //                     card.style.display = 'block';
    //                 });
    //                 currentPage++;
    //             } else {
                    
    //                 window.removeEventListener('scroll', loadMoreItems);
    //             }

    //             hideLoading();
    //         }, 1000);
    //     }
    // }

   
    // window.addEventListener('scroll', loadMoreItems);
//});

document.addEventListener('DOMContentLoaded', function() {
    const allCards = document.querySelectorAll('.anime-card');

    allCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const tooltip = card.querySelector('.tooltip');
            if (tooltip) {
                tooltip.style.display = 'block'; 
            } else {
                console.error('Tooltip не найден для этой карточки');
            }
        });

        card.addEventListener('mouseleave', () => {
            const tooltip = card.querySelector('.tooltip');
            if (tooltip) {
                tooltip.style.display = 'none'; 
            }
        });
    });
    function updateTooltipPosition() {
        const tooltips = document.querySelectorAll('.tooltip');
        
        tooltips.forEach(tooltip => {
            const card = tooltip.closest('.anime-card');
            const cardRect = card.getBoundingClientRect();
            const tooltipWidth = tooltip.offsetWidth;
            
            // Проверяем, хватает ли места справа
            if (cardRect.right + tooltipWidth > window.innerWidth) {
                tooltip.classList.add('tooltip-left');
            } else {
                tooltip.classList.remove('tooltip-left');
            }
        });
    }
    
    // Вызываем функцию при наведении на карточку
    document.querySelectorAll('.anime-card').forEach(card => {
        card.addEventListener('mouseenter', updateTooltipPosition);
    });
    
    // Обновляем позиции при изменении размера окна
    window.addEventListener('resize', updateTooltipPosition);
});

document.addEventListener('DOMContentLoaded', () => {
    const animeCards = document.querySelectorAll('.catalog .anime-card.container.video-container');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageInfo = document.getElementById('page-info');
    const pageNumbersContainer = document.getElementById('page-numbers');

    if (!prevButton || !nextButton || !pageInfo || !pageNumbersContainer) {
        console.error("Не удалось найти элементы пагинации.");
        return;
    }

    const itemsPerPage = 8;
    let currentPage = 1;
    const totalItems = animeCards.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    function renderPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        animeCards.forEach((card, index) => {
            card.style.display = (index >= startIndex && index < endIndex) ? 'block' : 'none';
        });

        pageNumbersContainer.innerHTML = '';
        const prevArrow = document.createElement('button');
        prevArrow.innerHTML = '&lt;';
        prevArrow.classList.add('pagination-button', 'arrow');
        prevArrow.disabled = page === 1;
        prevArrow.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderPage(currentPage);
            }
        });
        pageNumbersContainer.appendChild(prevArrow);
        let startPage = Math.max(1, page - 2);
        let endPage = Math.min(totalPages, page + 2);

        if (page <= 3) {
            endPage = Math.min(5, totalPages);
        }
        if (page >= totalPages - 2) {
            startPage = Math.max(1, totalPages - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageNumber = document.createElement('button');
            pageNumber.textContent = i;
            pageNumber.classList.add('pagination-button');
            if (i === page) {
                pageNumber.classList.add('active');
            }
            pageNumber.addEventListener('click', () => {
                currentPage = i;
                renderPage(currentPage);
            });
            pageNumbersContainer.appendChild(pageNumber);
        }
        if (endPage < totalPages) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.classList.add('pagination-dots');
            pageNumbersContainer.appendChild(dots);

            const lastPage = document.createElement('button');
            lastPage.textContent = totalPages;
            lastPage.classList.add('pagination-button');
            lastPage.addEventListener('click', () => {
                currentPage = totalPages;
                renderPage(currentPage);
            });
            pageNumbersContainer.appendChild(lastPage);
        }

        const nextArrow = document.createElement('button');
        nextArrow.innerHTML = '&gt;';
        nextArrow.classList.add('pagination-button', 'arrow');
        nextArrow.disabled = page === totalPages;
        nextArrow.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderPage(currentPage);
            }
        });
        pageNumbersContainer.appendChild(nextArrow);
    }

    renderPage(currentPage);
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.season-slider');
    const slides = document.querySelector('.season-slides');
    const cards = Array.from(slides.children);
    const prevButton = document.querySelector('.season-prev');
    const nextButton = document.querySelector('.season-next');
    
    let currentIndex = 0;
    let cardWidth;
    let cardsPerView;
    
    // Функция обновления размеров
    function updateDimensions() {
        // Получаем актуальную ширину карточки с учетом отступов
        cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
        // Вычисляем количество видимых карточек
        cardsPerView = Math.floor(slider.offsetWidth / cardWidth);
        
        // Проверяем и корректируем текущий индекс
        if (currentIndex > cards.length - cardsPerView) {
            currentIndex = cards.length - cardsPerView;
            moveSlides(0);
        }
    }
    
    // Функция для перемещения слайдов
    function moveSlides(direction) {
        currentIndex = Math.max(0, Math.min(currentIndex + direction, cards.length - cardsPerView));
        slides.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Обновление состояния кнопок
        prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1";
        nextButton.style.opacity = currentIndex >= cards.length - cardsPerView ? "0.5" : "1";
        prevButton.style.pointerEvents = currentIndex === 0 ? "none" : "auto";
        nextButton.style.pointerEvents = currentIndex >= cards.length - cardsPerView ? "none" : "auto";
    }
    
    // Обработчики для кнопок
    prevButton.addEventListener('click', () => moveSlides(-1));
    nextButton.addEventListener('click', () => moveSlides(1));
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
        updateDimensions();
        moveSlides(0); // Обновляем позицию без смещения
    });
    
    // Инициализация слайдера
    updateDimensions();
    moveSlides(0);
    
    // Добавляем поддержку свайпов для мобильных устройств
    let touchStartX = 0;
    let touchEndX = 0;
    
    slides.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    slides.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });
    
    slides.addEventListener('touchend', () => {
        const swipeDistance = touchStartX - touchEndX;
        if (Math.abs(swipeDistance) > 50) { // Минимальное расстояние для свайпа
            if (swipeDistance > 0) {
                moveSlides(1); // Свайп влево
            } else {
                moveSlides(-1); // Свайп вправо
            }
        }
    });
});

// Добавляем обработчик для переключения темы
document.getElementById('theme-toggle').addEventListener('click', function() {
    const body = document.body;
    const themeIcon = this.previousElementSibling; // Получаем иконку
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        this.textContent = 'Тёмная тема';
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        body.classList.add('dark-theme');
        this.textContent = 'Светлая тема';
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Сохраняем выбор пользователя
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Проверяем сохраненную тему при загрузке
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.previousElementSibling;
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = 'Светлая тема';
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
});

