
(() => {
    const section = document.querySelector('.news-section');
    const list = section && section.querySelector('.news-list');
    const nav = section && section.querySelector('.news-pagination');
    if (!list || !nav) return;

    const pageLinks = Array.from(nav.querySelectorAll('.news-pagination-item'));
    const prevLink = nav.querySelector('[data-nav="prev"]');
    const nextLink = nav.querySelector('[data-nav="next"]');
    const totalPages = parseInt(nav.dataset.totalPages, 10) || pageLinks.length;

    let currentPage = 1;

    const clamp = (n) => Math.min(Math.max(n, 1), totalPages);

    const getPageFromUrl = () => {
        const p = parseInt(new URLSearchParams(location.search).get('page'), 10);
        return clamp(Number.isNaN(p) ? 1 : p);
    };

    const renderItems = (page) => {
        list.dataset.page = page;
    };

    const updatePagination = (page) => {
        pageLinks.forEach((link) => {
            const isCurrent = Number(link.dataset.page) === page;
            link.classList.toggle('is-current', isCurrent);
            if (isCurrent) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        const setArrow = (link, target, disabled) => {
            link.href = `?page=${target}`;
            link.classList.toggle('is-disabled', disabled);
            link.setAttribute('aria-disabled', String(disabled));
            link.tabIndex = disabled ? -1 : 0;
        };

        setArrow(prevLink, clamp(page - 1), page === 1);
        setArrow(nextLink, clamp(page + 1), page === totalPages);
    };

    const goToPage = (page, { push = true, scroll = true } = {}) => {
        page = clamp(page);
        if (page === currentPage && !scroll) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        list.classList.add('is-changing');
        setTimeout(() => {
            currentPage = page;
            renderItems(page);
            updatePagination(page);
            list.classList.remove('is-changing');
        }, reduceMotion ? 0 : 200);

        if (push) {
            history.pushState({ page }, '', `?page=${page}`);
        }
        if (scroll) {
            section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }
    };

    nav.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link || !nav.contains(link)) return;
        e.preventDefault();
        if (link.classList.contains('is-disabled')) return;

        if (link.dataset.page) {
            goToPage(Number(link.dataset.page));
        } else if (link.dataset.nav === 'prev') {
            goToPage(currentPage - 1);
        } else if (link.dataset.nav === 'next') {
            goToPage(currentPage + 1);
        }
    });

    window.addEventListener('popstate', () => {
        goToPage(getPageFromUrl(), { push: false, scroll: false });
    });

    currentPage = getPageFromUrl();
    renderItems(currentPage);
    updatePagination(currentPage);
    history.replaceState({ page: currentPage }, '', location.search || '?page=1');
})();
