// Mobile menu
const menu = document.getElementById('menu');
document.getElementById('menuBtn').onclick = () => menu.classList.toggle('open');
menu.querySelectorAll('a').forEach(a => a.onclick = () => menu.classList.remove('open'));

// Typing effect
const words = ['Python Learner', 'Web Page Creator', 'Data Explorer', 'Gamer'];
let w = 0, c = 0, del = false;
const el = document.getElementById('typing');
(function type() {
  const word = words[w];
  el.textContent = word.slice(0, c);
  c += del ? -1 : 1;
  let delay = del ? 50 : 100;
  if (!del && c > word.length) { del = true; delay = 1200; }
  else if (del && c < 0) { del = false; w = (w + 1) % words.length; c = 0; delay = 300; }
  setTimeout(type, delay);
})();

// Scroll reveal + skill bars
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      e.target.querySelectorAll('.bar i').forEach(b => b.style.width = b.dataset.w + '%');
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(s => io.observe(s));

// Contact form -> Python server (app.py)
document.getElementById('msgForm').onsubmit = async e => {
  e.preventDefault();
  const status = document.getElementById('status');
  try {
    const res = await fetch('/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, message: msg.value })
    });
    status.textContent = res.ok ? 'Message sent! Thank you 💙' : 'Something went wrong.';
    if (res.ok) e.target.reset();
  } catch { status.textContent = 'Run app.py first to send messages.'; }
};
