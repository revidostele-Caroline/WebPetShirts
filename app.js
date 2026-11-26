// Catálogo editable: cada objeto representa una camiseta personalizable.
const products = [
  { name: 'Camiseta “Toby” Clásica', description: 'Marfil · corte clásico · su retrato y nombre al frente.', price: 449, tag: 'Favorita', image: 'photo-1552053831-71594a27632d', alt: 'Golden retriever de expresión alegre' },
  { name: 'Edición “Canela” Oversize', description: 'Verde salvia · fit relajado · estampado de alto detalle.', price: 529, tag: 'Nuevo', image: 'photo-1583337130417-3346a1be7dee', alt: 'Perro pequeño sentado con atención' },
  { name: 'Camiseta “Luna” Minimal', description: 'Algodón blanco · corte recto · foto y nombre en tinta terracota.', price: 449, tag: 'Esencial', image: 'photo-1543466835-00a7907e9de1', alt: 'Perro de pelaje claro mirando de lado' },
  { name: 'Edición “Bruno” Relax', description: 'Arena cálido · fit relajado · su carita en gran formato.', price: 499, tag: 'Más querido', image: 'photo-1517849845537-4d257902454a', alt: 'Perro pequeño de pelo rizado' },
  { name: 'Camiseta “Mora” Clásica', description: 'Rosa arcilla · corte clásico · retrato personalizado.', price: 449, tag: 'Edición especial', image: 'photo-1537151625747-768eb6cf92b2', alt: 'Cachorro de mirada dulce' },
  { name: 'Edición “Rocky” Gráfica', description: 'Azul petróleo · corte unisex · nombre en tipografía bold.', price: 499, tag: 'Nuevo', image: 'photo-1548199973-03cce0bbc87b', alt: 'Dos perros disfrutando al aire libre' },
  { name: 'Camiseta “Nala” Suave', description: 'Amarillo mantequilla · algodón suave · foto con marco orgánico.', price: 479, tag: 'Suave', image: 'photo-1534361960057-19889db9621e', alt: 'Perro simpático mirando hacia arriba' },
  { name: 'Edición “Max” Weekend', description: 'Gris jaspe · fit cómodo · retrato y nombre para diario.', price: 499, tag: 'Para diario', image: 'photo-1587300003388-59208cc962cb', alt: 'Perro de pelaje dorado en exterior' },
  { name: 'Camiseta “Frida” Color', description: 'Terracota suave · corte clásico · impresión con acento de color.', price: 529, tag: 'Color', image: 'photo-1533738363-b7f9aef128ce', alt: 'Perro pequeño con expresión curiosa' },
  { name: 'Edición “Milo” Dúo', description: 'Crema natural · fit relajado · foto protagonista y nombre.', price: 549, tag: 'Especial', image: 'photo-1518717758536-85ae29035b6d', alt: 'Perro de compañía con orejas erguidas' }
];

const grid = document.querySelector('#product-grid');
const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

// Crea las tarjetas desde el arreglo para mantener el catálogo fácil de actualizar.
function renderProducts() {
  grid.innerHTML = products.map((product, index) => `
    <article class="product-card">
      <div class="product-image">
        <img src="https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=800&q=80" alt="${product.alt}" loading="lazy">
        <span class="product-number">PS · ${String(index + 1).padStart(2, '0')}</span>
        <span class="product-tag">${product.tag}</span>
      </div>
      <div class="product-info">
        <div class="product-topline"><h3>${product.name}</h3><span class="price">${money.format(product.price)}</span></div>
        <p class="product-description">${product.description}</p>
        <button class="product-button" type="button" data-product="${index}">Personalizar con mi perro <span aria-hidden="true">↗</span></button>
      </div>
    </article>`).join('');
  document.querySelector('#product-count').textContent = `${products.length} piezas para amar`;
}

renderProducts();

// Menú desplegable para pantallas pequeñas.
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Abrir menú' : 'Cerrar menú');
  mainNav.classList.toggle('is-open', !expanded);
});
mainNav.addEventListener('click', event => {
  if (event.target.closest('a')) {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
  }
});

// El modal da contexto y prepara un correo para iniciar el pedido personalizado.
const dialog = document.querySelector('#customize-dialog');
grid.addEventListener('click', event => {
  const button = event.target.closest('[data-product]');
  if (!button) return;
  const product = products[Number(button.dataset.product)];
  document.querySelector('#dialog-product').textContent = `${product.name} · ${money.format(product.price)}`;
  const subject = encodeURIComponent(`Quiero personalizar ${product.name}`);
  document.querySelector('#dialog-mail').href = `mailto:hola@petshirt.mx?subject=${subject}`;
  dialog.showModal();
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

document.querySelector('#year').textContent = new Date().getFullYear();

