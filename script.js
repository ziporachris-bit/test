// simple interactive feedback for YES/NO
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main') || document.querySelector('.container');
  const feedback = document.createElement('div');
  feedback.className = 'feedback-section';
  feedback.innerHTML = `
    <div id="feedback" aria-live="polite">
      <span class="feedback-text">Will you let SPEAK NIGERIA be your pathway to healing?</span>
      <button id="yesBtn" class="btn yes">YES</button>
      <button id="noBtn" class="btn no">NO</button>
      <span id="feedbackMsg" class="feedback-msg" role="status"></span>
    </div>
  `;

  // append to the end of main so it appears at the bottom of the page
  main.appendChild(feedback);

  const yes = document.getElementById('yesBtn');
  const no = document.getElementById('noBtn');
  const msg = document.getElementById('feedbackMsg');

  yes.addEventListener('click', () => {
    msg.style.color = 'red0c878';
    msg.textContent = 'we are glad we have you with us now!';
  });

  no.addEventListener('click', () => {
    msg.style.color = '#ff8e6bff';
    msg.textContent = 'whenever you are ready, we will be here for you.';
    setTimeout(() => {
      const details = prompt('sure you dont want to talk to someone?');
      if (details) console.log('feedback:', details);
    }, 120);
  });
});