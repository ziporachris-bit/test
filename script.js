// demo feedback + client-side create account / sign in (localStorage) — not secure for production
document.addEventListener('DOMContentLoaded', () => {
  // append feedback to bottom (if not already present)
  const main = document.querySelector('main') || document.querySelector('.container');
  if (main && !document.querySelector('.feedback-section')) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback-section';
    feedback.innerHTML = `
      <div id="feedback" aria-live="polite">
        <span class="feedback-text">Was this helpful?</span>
        <button id="yesBtn" class="btn yes">YES</button>
        <button id="noBtn" class="btn no">NO</button>
        <span id="feedbackMsg" class="feedback-msg" role="status"></span>
      </div>
    `;
    main.appendChild(feedback);

    document.getElementById('yesBtn')?.addEventListener('click', () => {
      const msg = document.getElementById('feedbackMsg');
      if (msg) { msg.style.color = '#ffd166'; msg.textContent = 'Thanks — glad it helped!'; }
    });
    document.getElementById('noBtn')?.addEventListener('click', () => {
      const msg = document.getElementById('feedbackMsg');
      if (msg) { msg.style.color = '#ff6b6b'; msg.textContent = 'Sorry — tell us what to improve.'; }
    });
  }

  // create account
  const createForm = document.getElementById('createaccount');
  if (createForm) {
    createForm.addEventListener('submit', e => {
      e.preventDefault();
      const f = new FormData(createForm);
      const name = (f.get('name') || '').toString().trim();
      const email = (f.get('email') || '').toString().toLowerCase().trim();
      const pass = (f.get('password') || '').toString();
      const conf = (f.get('confirm') || '').toString();
      if (!name || !email || !pass) return alert('Complete all fields');
      if (pass !== conf) return alert('Passwords do not match');
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (users[email]) return alert('Account already exists');
      users[email] = { name, password: pass };
      localStorage.setItem('users', JSON.stringify(users));
      alert('Account created — please sign in');
      location.href = 'signin.html';
    });
  }

  // sign in
  const signin = document.getElementById('signinForm');
  if (signin) {
    signin.addEventListener('submit', e => {
      e.preventDefault();
      const f = new FormData(signin);
      const email = (f.get('email') || '').toString().toLowerCase().trim();
      const pass = (f.get('password') || '').toString();
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      const user = users[email];
      if (!user || user.password !== pass) return alert('Invalid credentials');

      // demo "logged in" flag
      localStorage.setItem('currentUser', JSON.stringify({ email, name: user.name }));

      // redirect to dashboard page
      location.href = 'dashboard.html';
    });
  }

  // SLIDER logic
  const slider = document.querySelector('.slider');
  const slidesEl = slider?.querySelector('.slides');
  if (slider && slidesEl) {
    // ensure transition is set (CSS preferred)
    slidesEl.style.transition = slidesEl.style.transition || 'transform 0.5s ease';
    const slides = Array.from(slidesEl.children).filter(n => n.classList && n.classList.contains('slide'));
    const total = slides.length;
    if (total === 0) {
      console.warn('Slider found but no .slide elements inside .slides.');
    } else {
      let idx = 0;
      const go = i => {
        idx = ((i % total) + total) % total;
        slidesEl.style.transform = `translateX(-${idx * 100}%)`;
      };

      // Prev / Next buttons
      slider.querySelector('.prev')?.addEventListener('click', () => go(idx - 1));
      slider.querySelector('.next')?.addEventListener('click', () => go(idx + 1));

      // autoplay
      let interval = setInterval(() => go(idx + 1), 4000);

      // pause on hover/focus
      slider.addEventListener('mouseenter', () => clearInterval(interval));
      slider.addEventListener('mouseleave', () => {
        clearInterval(interval);
        interval = setInterval(() => go(idx + 1), 4000);
      });

      // allow keyboard navigation when focused
      slider.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') go(idx - 1);
        if (e.key === 'ArrowRight') go(idx + 1);
      });

      // initial positioning
      go(0);
    }
  } else {
    // helpful debug message
    if (!slider) console.info('No .slider element found on this page.');
    else if (!slidesEl) console.info('No .slides element found inside .slider.');
  }
});
