// Stay slider (Swiper 11)
// Load Swiper before this file:
//   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
//   <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
//   <script src="assets/js/stay.js"></script>

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.stay-slider');
  if (!slider) return;

  new Swiper(slider, {
    slidesPerView: 'auto', // slide width comes from CSS (--stay-slide-w)
    speed: 600,
    navigation: {
      prevEl: '.stay-prev',
      nextEl: '.stay-next',
      disabledClass: 'swiper-button-disabled'
    },
    pagination: {
      el: '.stay-dots',
      clickable: true
    }
  });
});