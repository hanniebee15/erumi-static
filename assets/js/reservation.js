(function () {
  var inEl = document.getElementById('contact-checkin');
  var outEl = document.getElementById('contact-checkout');
  if (!inEl || !outEl) return;

  var d = new Date();
  var today = d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
  inEl.min = today;
  outEl.min = today;

  inEl.addEventListener('change', function () {
    outEl.min = inEl.value || today;
    if (outEl.value && outEl.value < outEl.min) outEl.value = '';
  });
})();