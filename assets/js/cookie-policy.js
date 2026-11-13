 (function () {
        var wrap = document.getElementById('cookie-policy-table-wrap');
        if (!wrap) return;
        var hint = wrap.querySelector('.cookie-policy-scroll-hint');
        wrap.addEventListener('scroll', function () {
            if (hint) hint.classList.add('is-hidden');
        }, { passive: true, once: true });
    })();