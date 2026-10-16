const menuItems = [
  {
    id: 1,
    name: 'Velvet Cloud Latte',
    category: 'coffee',
    badge: 'Best Seller',
    price: 185,
    description: 'Double espresso, oat milk, salted caramel cream, and a soft cocoa finish.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 2,
    name: 'Spanish Latte Royale',
    category: 'coffee',
    badge: 'Creamy',
    price: 175,
    description: 'Rich espresso balanced with velvety milk and a smooth condensed milk sweetness.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 3,
    name: 'Midnight Cold Brew',
    category: 'coffee',
    badge: 'Bold',
    price: 165,
    description: 'Slow-steeped cold brew with dark chocolate notes and a clean, smooth finish.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 4,
    name: 'Ceremonial Matcha Cloud',
    category: 'noncoffee',
    badge: 'Refreshing',
    price: 195,
    description: 'Premium matcha, milk, vanilla foam, and a light honey drizzle.',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 5,
    name: 'Strawberry Cream Fizz',
    category: 'noncoffee',
    badge: 'Sparkling',
    price: 170,
    description: 'Fresh strawberry compote, soda, cream float, and citrus brightness.',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 6,
    name: 'Dark Cocoa Velvet',
    category: 'noncoffee',
    badge: 'Comfort',
    price: 165,
    description: 'French-style chocolate drink with steamed milk and toasted marshmallow foam.',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 7,
    name: 'Almond Butter Croissant',
    category: 'pastry',
    badge: 'Fresh Daily',
    price: 145,
    description: 'Flaky butter croissant filled with almond cream and toasted almond flakes.',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 8,
    name: 'Burnt Basque Cheesecake',
    category: 'pastry',
    badge: 'Slice',
    price: 195,
    description: 'Creamy cheesecake slice with caramelized top and a light espresso pairing note.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 9,
    name: 'Truffle Egg Toast',
    category: 'brunch',
    badge: 'Brunch',
    price: 260,
    description: 'Buttered sourdough, soft scrambled eggs, truffle cream, herbs, and parmesan.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 10,
    name: 'Smoked Chicken Panini',
    category: 'brunch',
    badge: 'Savory',
    price: 285,
    description: 'Smoked chicken, mozzarella, pesto, tomatoes, and crisp pressed sourdough.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 11,
    name: 'Granola Yogurt Bowl',
    category: 'brunch',
    badge: 'Light',
    price: 235,
    description: 'Greek yogurt, honey granola, banana, berries, chia, and toasted coconut.',
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 12,
    name: 'Sea Salt Cookie Box',
    category: 'pastry',
    badge: 'Giftable',
    price: 320,
    description: 'Six chewy brown-butter cookies with dark chocolate chunks and sea salt.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85'
  }
];

const testimonials = [
  {
    quote: 'The Velvet Cloud Latte tastes premium without feeling intimidating. The place is cozy, clean, and perfect for studying after class.',
    name: 'Mika Reyes',
    role: 'Student guest'
  },
  {
    quote: 'Their brunch plates are filling, the coffee is consistent, and the interior feels like a modern Manila café worth revisiting.',
    name: 'Aaron Lim',
    role: 'Weekend regular'
  },
  {
    quote: 'We ordered pastry boxes for a small office event. Smooth transaction, beautiful packaging, and everyone loved the croissants.',
    name: 'Celeste Tan',
    role: 'Corporate client'
  }
];

const formatPeso = amount => `₱${amount.toLocaleString('en-PH')}`;
const menuGrid = document.getElementById('menuGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartPanel = document.getElementById('cartPanel');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const toast = document.getElementById('toast');
let cart = [];
let activeFilter = 'all';
let testimonialIndex = 0;
let toastTimer;

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function renderMenu(filter = 'all') {
  const items = filter === 'all' ? menuItems : menuItems.filter(item => item.category === filter);
  menuGrid.innerHTML = items.map(item => `
    <article class="menu-card tilt-card reveal visible" data-category="${item.category}">
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="menu-content">
        <div class="menu-topline">
          <span>${item.badge}</span>
          <small>${item.category.replace('noncoffee', 'non-coffee')}</small>
        </div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="price-line">
          <strong>${formatPeso(item.price)}</strong>
          <button class="add-cart" type="button" data-id="${item.id}">Add to Order</button>
        </div>
      </div>
    </article>
  `).join('');
}

function openCart() {
  cartPanel.classList.add('open');
  cartBackdrop.classList.add('open');
  cartPanel.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeCart() {
  cartPanel.classList.remove('open');
  cartBackdrop.classList.remove('open');
  cartPanel.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

function addToCart(id) {
  const item = menuItems.find(product => product.id === Number(id));
  if (!item) return;

  const existingItem = cart.find(product => product.id === item.id);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCart();
  showToast(`${item.name} added to your order.`);
}

function updateQty(id, action) {
  const item = cart.find(product => product.id === Number(id));
  if (!item) return;

  if (action === 'increase') item.qty += 1;
  if (action === 'decrease') item.qty -= 1;
  cart = cart.filter(product => product.qty > 0);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  cartCount.textContent = count;
  cartTotal.textContent = formatPeso(total);

  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty. Add a menu item to begin.</p>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <small>${formatPeso(item.price)} each</small>
      </div>
      <div class="qty-controls" aria-label="Quantity controls for ${item.name}">
        <button type="button" data-action="decrease" data-id="${item.id}">−</button>
        <strong>${item.qty}</strong>
        <button type="button" data-action="increase" data-id="${item.id}">+</button>
      </div>
    </div>
  `).join('');
}

function renderTestimonial() {
  const current = testimonials[testimonialIndex];
  document.getElementById('testimonialQuote').textContent = `“${current.quote}”`;
  document.getElementById('testimonialName').textContent = current.name;
  document.getElementById('testimonialRole').textContent = current.role;
}

function changeTestimonial(direction) {
  testimonialIndex = (testimonialIndex + direction + testimonials.length) % testimonials.length;
  renderTestimonial();
}

function updateOpenStatus() {
  const status = document.getElementById('openStatus');
  if (!status) return;

  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  let open = 7;
  let close = 21;

  if (day === 6) {
    open = 8;
    close = 22;
  } else if (day === 0) {
    open = 8;
    close = 20;
  }

  status.textContent = hour >= open && hour < close ? 'Open now for dine-in and pickup' : 'Closed now — pre-orders welcome';
}

function setReservationMinDate() {
  const dateInput = document.querySelector('input[type="date"]');
  if (!dateInput) return;
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

function initRevealAnimations() {
  const revealEls = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealEls.forEach(el => observer.observe(el));
}

function initTiltCards() {
  document.addEventListener('mousemove', event => {
    const card = event.target.closest('.tilt-card');
    if (!card || window.innerWidth < 900) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  document.addEventListener('mouseleave', event => {
    const card = event.target.closest?.('.tilt-card');
    if (card) card.style.transform = '';
  }, true);

  document.addEventListener('mouseout', event => {
    const card = event.target.closest?.('.tilt-card');
    if (card && !card.contains(event.relatedTarget)) card.style.transform = '';
  });
}

function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  window.addEventListener('pointermove', event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

function initNav() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const links = [...navLinks.querySelectorAll('a')];

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.addEventListener('click', event => {
    if (event.target.matches('a, button')) {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('scroll', () => {
    const fromTop = window.scrollY + 120;
    links.forEach(link => {
      const section = document.querySelector(link.hash);
      if (!section) return;
      const active = section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop;
      link.classList.toggle('active', active);
    });
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderMenu(activeFilter);
  });
});

menuGrid.addEventListener('click', event => {
  const addButton = event.target.closest('.add-cart');
  if (!addButton) return;
  addToCart(addButton.dataset.id);
});

cartItems.addEventListener('click', event => {
  const control = event.target.closest('button[data-action]');
  if (!control) return;
  updateQty(control.dataset.id, control.dataset.action);
});

document.querySelectorAll('.open-order').forEach(button => button.addEventListener('click', openCart));
document.getElementById('closeCart').addEventListener('click', closeCart);
cartBackdrop.addEventListener('click', closeCart);

document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (!cart.length) {
    showToast('Your cart is empty. Please add at least one item.');
    return;
  }

  cart = [];
  updateCart();
  closeCart();
  showToast('Order received! This demo checkout can be connected to your real ordering system.');
});

document.getElementById('reservationForm').addEventListener('submit', event => {
  event.preventDefault();
  event.currentTarget.reset();
  setReservationMinDate();
  showToast('Reservation request sent! We will contact you shortly.');
});

document.getElementById('prevTestimonial').addEventListener('click', () => changeTestimonial(-1));
document.getElementById('nextTestimonial').addEventListener('click', () => changeTestimonial(1));

setInterval(() => changeTestimonial(1), 6500);

renderMenu();
renderTestimonial();
updateCart();
updateOpenStatus();
setReservationMinDate();
initRevealAnimations();
initTiltCards();
initCursorGlow();
initNav();
