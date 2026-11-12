// Stay slider (Swiper 11)
// Load Swiper before this file:
//   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
//   <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
//   <script src="assets/js/stay.js"></script>

document.addEventListener('DOMContentLoaded', () => {
  // One Swiper per section, each with its own scoped controls
  document.querySelectorAll('section.stay').forEach((section) => {
    const slider = section.querySelector('.stay-slider');
    if (!slider) return;

    const prevEl = section.querySelector('.stay-prev');
    const nextEl = section.querySelector('.stay-next');
    const dotsEl = section.querySelector('.stay-dots');

    new Swiper(slider, {
      slidesPerView: 'auto', // slide width comes from CSS
      speed: 600,
      navigation: {
        prevEl,            // element references, not global selectors
        nextEl,
        disabledClass: 'swiper-button-disabled'
      },
      pagination: {
        el: dotsEl,
        clickable: true
      }
    });
  });
});


// MODAL 
document.querySelectorAll('.stay-modal').forEach((el) => {
  bootstrap.Modal.getOrCreateInstance(el, {
    backdrop: 'static',
    keyboard: false
  });
});