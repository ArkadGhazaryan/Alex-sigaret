const STORAGE_KEY = "alex_sigareti_site_data_v3";

function packImage(title, mainColor, accentColor, glowColor) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#080012"/>
          <stop offset="0.5" stop-color="${mainColor}"/>
          <stop offset="1" stop-color="#00111f"/>
        </linearGradient>
        <linearGradient id="pack" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fff7ff"/>
          <stop offset="0.48" stop-color="${accentColor}"/>
          <stop offset="1" stop-color="${mainColor}"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="9" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="900" height="650" fill="url(#bg)"/>
      <g opacity="0.42">
        <path d="M0 510 C180 430 250 600 420 500 C610 390 690 540 900 430" fill="none" stroke="#ffffff" stroke-width="16"/>
        <path d="M0 190 C160 80 300 280 470 150 C610 40 730 160 900 80" fill="none" stroke="${glowColor}" stroke-width="10"/>
      </g>
      <g stroke="#ffffff" opacity="0.16">
        <path d="M0 95H900M0 190H900M0 285H900M0 380H900M0 475H900"/>
        <path d="M95 0V650M190 0V650M285 0V650M380 0V650M475 0V650M570 0V650M665 0V650M760 0V650M855 0V650"/>
      </g>
      <ellipse cx="468" cy="560" rx="260" ry="36" fill="#000000" opacity="0.34"/>
      <g transform="translate(304 96) rotate(-6 150 220)" filter="url(#glow)">
        <rect x="0" y="0" width="300" height="430" rx="26" fill="url(#pack)" stroke="#fff7ff" stroke-width="7"/>
        <rect x="24" y="28" width="252" height="82" rx="14" fill="#05000a" opacity="0.86"/>
        <text x="150" y="78" text-anchor="middle" font-family="Arial Black, Arial" font-size="31" fill="#ffffff">${title}</text>
        <rect x="38" y="138" width="224" height="116" rx="22" fill="#05000a" opacity="0.68"/>
        <text x="150" y="186" text-anchor="middle" font-family="Arial Black, Arial" font-size="42" fill="${glowColor}">ALEX</text>
        <text x="150" y="225" text-anchor="middle" font-family="Arial Black, Arial" font-size="29" fill="#fff7ff">SIGARETI</text>
        <rect x="44" y="296" width="212" height="70" rx="35" fill="#05000a" opacity="0.78"/>
        <text x="150" y="340" text-anchor="middle" font-family="Arial Black, Arial" font-size="24" fill="${accentColor}">CYBER SMOKE</text>
      </g>
      <g transform="translate(146 370) rotate(-13)">
        <rect x="0" y="0" width="330" height="28" rx="14" fill="#fff7ff"/>
        <rect x="226" y="0" width="70" height="28" rx="14" fill="${accentColor}"/>
        <circle cx="312" cy="14" r="14" fill="#ff6b00"/>
        <circle cx="316" cy="14" r="7" fill="#ffe600"/>
      </g>
      <g transform="translate(452 410) rotate(16)">
        <rect x="0" y="0" width="300" height="26" rx="13" fill="#fff7ff"/>
        <rect x="204" y="0" width="66" height="26" rx="13" fill="${mainColor}"/>
        <circle cx="284" cy="13" r="13" fill="#ff2b00"/>
        <circle cx="288" cy="13" r="6" fill="#ffe600"/>
      </g>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const defaultData = {
  companyName: "Alex Sigareti",
  homeText: "Киберпанк сайт про smoke style: неон, пачки сигарет, яркая галерея, каталог и админка без backend. Все работает прямо из браузера.",
  contacts: {
    phone: "+374 00 000 000",
    email: "info@alexsigareti.com",
    address: "Yerevan, Armenia"
  },
  products: [
    {
      id: "p1",
      name: "Neon Pack",
      description: "Яркая cyberpunk пачка с кислотным светом, дымом и ночным настроением.",
      price: "AMD 1 800",
      image: packImage("NEON", "#ff2bd6", "#00f5ff", "#b9ff00")
    },
    {
      id: "p2",
      name: "Toxic Blue",
      description: "Синий неон, контрастная пачка и визуал в стиле ночного города.",
      price: "AMD 2 100",
      image: packImage("TOXIC", "#00f5ff", "#ffe600", "#ff2bd6")
    },
    {
      id: "p3",
      name: "Acid Smoke",
      description: "Кислотный зеленый стиль для максимально заметной карточки товара.",
      price: "AMD 1 950",
      image: packImage("ACID", "#b9ff00", "#7c3cff", "#00f5ff")
    },
    {
      id: "p4",
      name: "Violet Burn",
      description: "Фиолетовая пачка с огненным акцентом и яркой cyberpunk подачей.",
      price: "AMD 2 400",
      image: packImage("BURN", "#7c3cff", "#ff7a00", "#ffe600")
    }
  ]
};

function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getSiteData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) {
    saveSiteData(defaultData);
    return cloneData(defaultData);
  }

  try {
    return { ...cloneData(defaultData), ...JSON.parse(savedData) };
  } catch {
    saveSiteData(defaultData);
    return cloneData(defaultData);
  }
}

function saveSiteData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function renderCommonData(data) {
  document.title = document.title.replace("Alex Sigareti", data.companyName);
  setText("[data-company-name]", data.companyName);
  setText("[data-home-text]", data.homeText);
  setText("[data-contact-phone]", data.contacts.phone);
  setText("[data-contact-email]", data.contacts.email);
  setText("[data-contact-address]", data.contacts.address);
}

function productCard(product) {
  return `
    <article class="product-card">
      <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}">
      <div class="product-info">
        <h3>${escapeHTML(product.name)}</h3>
        <p>${escapeHTML(product.description)}</p>
        <span class="price">${escapeHTML(product.price)}</span>
      </div>
    </article>
  `;
}

function renderCatalog(data) {
  const productGrid = document.getElementById("productGrid");

  if (!productGrid) {
    return;
  }

  if (!data.products.length) {
    productGrid.innerHTML = '<div class="empty">Пока нет товаров. Добавь первый товар в админке.</div>';
    return;
  }

  productGrid.innerHTML = data.products.map(productCard).join("");
}

function renderGallery(data) {
  const galleryGrid = document.getElementById("galleryGrid");

  if (!galleryGrid) {
    return;
  }

  if (!data.products.length) {
    galleryGrid.innerHTML = '<div class="empty">Пока нет фото. Добавь товар с фото URL в админке.</div>';
    return;
  }

  galleryGrid.innerHTML = data.products
    .map((product) => `
      <article class="gallery-item">
        <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}">
      </article>
    `)
    .join("");
}

const siteData = getSiteData();
renderCommonData(siteData);
renderCatalog(siteData);
renderGallery(siteData);
