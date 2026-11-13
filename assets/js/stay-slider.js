document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section.stay').forEach((section) => {
    const slider = section.querySelector('.stay-slider');
    if (!slider) return;

    const prevEl = section.querySelector('.stay-prev');
    const nextEl = section.querySelector('.stay-next');
    const dotsEl = section.querySelector('.stay-dots');
    const wrapper = slider.querySelector('.swiper-wrapper');
    const firstSlide = slider.querySelector('.swiper-slide');

    let ghost = null;
    if (wrapper && firstSlide) {
      ghost = firstSlide.cloneNode(true);
      ghost.classList.remove('swiper-slide');
      ghost.classList.add('stay-ghost');
      ghost.setAttribute('aria-hidden', 'true');
      ghost.setAttribute('inert', '');
      ghost.querySelectorAll('button, a').forEach((el) => {
        el.removeAttribute('data-bs-toggle');
        el.removeAttribute('data-bs-target');
        el.setAttribute('tabindex', '-1');
      });
      wrapper.appendChild(ghost);
    }

    const syncGhost = (swiper) => {
      if (!ghost) return;
      const lastSlide = swiper.slides[swiper.slides.length - 1];
      if (!lastSlide) return;
      ghost.style.width = lastSlide.offsetWidth + 'px';
      ghost.style.left = (lastSlide.offsetLeft + lastSlide.offsetWidth) + 'px';
    };

    const applyEndOffset = (swiper) => {
      const lastSlide = swiper.slides[swiper.slides.length - 1];
      if (!lastSlide) return;
      const offset = Math.max(0, swiper.el.clientWidth - lastSlide.offsetWidth);
      if (swiper.params.slidesOffsetAfter !== offset) {
        swiper.params.slidesOffsetAfter = offset;
        swiper.update();
      }
      syncGhost(swiper);
    };

    new Swiper(slider, {
      slidesPerView: 'auto',
      speed: 600,
      navigation: {
        prevEl,      
        nextEl,
        disabledClass: 'swiper-button-disabled'
      },
      pagination: {
        el: dotsEl,
        clickable: true
      },
      on: {
        init: applyEndOffset,
        resize: applyEndOffset,
        breakpoint: applyEndOffset
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