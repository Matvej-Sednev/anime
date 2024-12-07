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
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');
        let currentSlide = 0;
        const numSlides = document.querySelectorAll('.video-anons').length;
        
        const imagePaths = [
          "/src/img/alya.png",
          "/src/img/dandan.jpg",
          "/src/img/Dolgo.jpg",
          "/src/img/new-video.jpg"
        ];
      
        function showSlide(n) {
          const slideWidth = 100 / numSlides;
          const slidesArray = Array.from(document.querySelectorAll('.video-anons')); 
          slidesArray.forEach((slide, index) => {
            if (index === n) {
                if(imagePaths[index]){ 
                  slide.style.backgroundImage = `url(${imagePaths[index]})`;
                }
            } else {
              slide.style.backgroundImage = 'none';
            }
          });
          slides.style.transform = `translateX(-${n * slideWidth}%)`;
        }
    
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % numSlides;
      showSlide(currentSlide);
    });
    
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + numSlides) % numSlides;
      showSlide(currentSlide);
    });
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