document.addEventListener('DOMContentLoaded', () => {
  const pagination = document.getElementById('pagination');
  if (!pagination) return;

  const pageItems = pagination.querySelectorAll('.page-item:not(:first-child):not(:last-child)');
  const prevBtn = pagination.querySelector('.prev-btn');
  const nextBtn = pagination.querySelector('.next-btn');

  let currentPage = 1;
  const totalPages = pageItems.length;

  function updatePagination(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    currentPage = newPage;

    pageItems.forEach((item, index) => {
      if (index + 1 === currentPage) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Handle scroll to top of section smoothly on page change
    document.querySelector('.stories-section').scrollIntoView({ behavior: 'smooth' });
  }

  pageItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      updatePagination(index + 1);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      updatePagination(currentPage - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      updatePagination(currentPage + 1);
    });
  }
});