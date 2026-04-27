const STORAGE_KEY = "alex_sigareti_site_data";

const defaultData = {
  companyName: "Alex Sigareti",
  homeText: "Современная компания с аккуратным каталогом, галереей и контактами. Все данные можно менять в админке без сервера.",
  contacts: {
    phone: "+374 00 000 000",
    email: "info@alexsigareti.com",
    address: "Yerevan, Armenia"
  },
  products: [
    {
      id: "p1",
      name: "Classic Gold",
      description: "Аккуратная позиция каталога в корпоративном стиле.",
      price: "AMD 1 200",
      image: "https://images.unsplash.com/photo-1520975682031-a6454f4f67d5?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "p2",
      name: "Black Edition",
      description: "Темный минималистичный товарный блок.",
      price: "AMD 1 500",
      image: "https://images.unsplash.com/photo-1515138692129-197a2c608cfd?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "p3",
      name: "White Label",
      description: "Светлый вариант для демонстрации каталога.",
      price: "AMD 1 350",
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=900&q=80"
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
