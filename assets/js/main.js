(function () {
  function initMobileNav() {
    var toggle = document.querySelector('.mobile-nav-toggle');
    var nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      var isOpen = nav.style.display === 'flex';
      nav.style.display = isOpen ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '72px';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = '#fff';
      nav.style.padding = '16px 24px';
      nav.style.borderBottom = '1px solid #E1E6EF';
    });
  }

  // Silent Google Form submission: posts to a hidden iframe so the page never
  // navigates away or shows Google's UI. Requires the form element to carry
  // data-gform-action (the form's .../formResponse URL) and its inputs to use
  // the matching entry.XXXXXXX names pulled from the real Google Form.
  function initSilentForms() {
    document.querySelectorAll('form[data-gform-action]').forEach(function (form) {
      var iframeName = 'hidden-submit-' + Math.random().toString(36).slice(2);
      var iframe = document.createElement('iframe');
      iframe.name = iframeName;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      form.setAttribute('action', form.getAttribute('data-gform-action'));
      form.setAttribute('method', 'POST');
      form.setAttribute('target', iframeName);

      form.addEventListener('submit', function () {
        setTimeout(function () {
          form.reset();
          var confirmEl = form.parentElement.querySelector('.confirm-msg');
          if (confirmEl) confirmEl.classList.add('show');
        }, 400);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initSilentForms();
  });
})();
