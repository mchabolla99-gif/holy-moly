/* HOLY MOLY FEST — shared JS */

// Mobile nav drawer
const burger = document.querySelector('.nav__burger');
const drawer = document.querySelector('.drawer');
const drawerClose = document.querySelector('.drawer__close');
if (burger && drawer) {
  burger.addEventListener('click', () => drawer.classList.add('is-open'));
  drawerClose?.addEventListener('click', () => drawer.classList.remove('is-open'));
}

// Cart drawer
const cart = document.querySelector('.cart');
const cartBackdrop = document.querySelector('.cart-backdrop');
const cartTriggers = document.querySelectorAll('[data-cart-open]');
const cartClose = document.querySelector('.cart__close');
const cartCountEl = document.querySelector('.nav__cart-count');

function openCart(){ cart?.classList.add('is-open'); cartBackdrop?.classList.add('is-open'); }
function closeCart(){ cart?.classList.remove('is-open'); cartBackdrop?.classList.remove('is-open'); }

cartTriggers.forEach(t => t.addEventListener('click', e => { e.preventDefault(); openCart(); }));
cartClose?.addEventListener('click', closeCart);
cartBackdrop?.addEventListener('click', closeCart);

// Demo cart state
const cartState = { count: 0, items: [] };
function addToCart(item){
  cartState.items.push(item);
  cartState.count = cartState.items.length;
  if (cartCountEl) cartCountEl.textContent = cartState.count;
  renderCart();
  openCart();
}
function renderCart(){
  const body = document.querySelector('.cart__body');
  if (!body) return;
  if (cartState.items.length === 0) {
    body.innerHTML = '<p style="text-align:center; padding:3rem 1rem;">Tu carrito está vacío. Dale una vuelta por la <a href="tienda.html" style="color:var(--pink); text-decoration:underline;">tienda</a>.</p>';
    return;
  }
  body.innerHTML = cartState.items.map((it, i) => `
    <div style="display:flex; gap:1rem; padding:1rem 0; border-bottom:1px solid rgba(0,0,0,.12);">
      <div style="width:70px; height:70px; background:var(--bg-warm); border:2px solid var(--ink); border-radius:8px; flex-shrink:0;"></div>
      <div style="flex:1;">
        <div style="font-family:var(--ff-display); font-size:1.1rem;">${it.name}</div>
        <div style="font-family:var(--ff-mono); font-size:.85rem; color:var(--ink-soft);">Talla ${it.size} · $${it.price} MXN</div>
      </div>
      <button onclick="removeFromCart(${i})" style="font-family:var(--ff-display); font-size:1.2rem;">×</button>
    </div>
  `).join('');
  const total = cartState.items.reduce((s, it) => s + it.price, 0);
  document.querySelector('.cart__total').textContent = `$${total} MXN`;
}
function removeFromCart(i){
  cartState.items.splice(i, 1);
  cartState.count = cartState.items.length;
  if (cartCountEl) cartCountEl.textContent = cartState.count;
  renderCart();
}
window.removeFromCart = removeFromCart;
window.addToCart = addToCart;

// Reveal on scroll
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-in'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// FAQ toggle
document.querySelectorAll('.faq__item').forEach(item => {
  item.querySelector('.faq__q')?.addEventListener('click', () => item.classList.toggle('is-open'));
});

// PDP thumb/size interactivity
document.querySelectorAll('.pdp__thumb').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.pdp__thumb').forEach(x => x.classList.remove('is-active'));
    t.classList.add('is-active');
  });
});
document.querySelectorAll('.pdp__size').forEach(s => {
  s.addEventListener('click', () => {
    document.querySelectorAll('.pdp__size').forEach(x => x.classList.remove('is-active'));
    s.classList.add('is-active');
  });
});

// Add-to-cart buttons
document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const name = btn.dataset.name || 'Item';
    const price = parseInt(btn.dataset.price || '0', 10);
    const activeSize = document.querySelector('.pdp__size.is-active');
    const size = activeSize ? activeSize.textContent.trim() : 'S-M';
    addToCart({ name, price, size });
  });
});

// Marquee duplicate tracks for seamless loop
document.querySelectorAll('.marquee').forEach(m => {
  const track = m.querySelector('.marquee__track');
  if (track) {
    const clone = track.cloneNode(true);
    m.appendChild(clone);
  }
});

// Parallax on hero mascot
const heroMascots = document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  heroMascots.forEach(el => {
    const speed = parseFloat(el.dataset.parallax || '0.15');
    el.style.transform = `translateY(${y * speed}px)`;
  });
}, { passive: true });
