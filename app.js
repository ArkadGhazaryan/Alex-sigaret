const STORAGE_KEY = "alex_sigareti_site_data_v2";

const defaultData = {
  companyName: "Alex Sigareti",
  homeText: "Темный, стильный и атмосферный smoke website: каталог, галерея, контакты и админка без backend. Все работает прямо из браузера.",
  contacts: {
    phone: "+374 00 000 000",
    email: "info@alexsigareti.com",
    address: "Yerevan, Armenia"
  },
  products: [
    {
      id: "p1",
      name: "Midnight Gold",
      description: "Темная premium позиция с золотым настроением и сильной визуальной подачей.",
      price: "AMD 1 800",
      image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "p2",
      name: "Smoke Black",
      description: "Строгий черный стиль, дымная атмосфера и clean карточка товара.",
      price: "AMD 2 100",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "p3",
      name: "Ash White",
      description: "Контрастная светлая позиция для баланса черного, белого и золотого.",
      price: "AMD 1 950",
      image: "https://images.unsplash.com/photo-1517315003714-a071486bd9ea?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "p4",
      name: "Ember Line",
      description: "Теплый акцент, как тлеющий огонь внутри темного визуального мира.",
      price: "AMD 2 400",
      image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80"
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
