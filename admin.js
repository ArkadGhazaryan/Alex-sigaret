const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "1234";
const SESSION_KEY = "alex_sigareti_admin_logged_in";

const loginBox = document.getElementById("loginBox");
const adminBox = document.getElementById("adminBox");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");
const settingsForm = document.getElementById("settingsForm");
const productForm = document.getElementById("productForm");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const adminProductList = document.getElementById("adminProductList");

const companyNameInput = document.getElementById("companyName");
const homeTextInput = document.getElementById("homeText");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");

const productIdInput = document.getElementById("productId");
const productNameInput = document.getElementById("productName");
const productDescriptionInput = document.getElementById("productDescription");
const productPriceInput = document.getElementById("productPrice");
const productImageInput = document.getElementById("productImage");
const productFormTitle = document.getElementById("productFormTitle");

let adminData = getSiteData();

function isLoggedIn() {
  return localStorage.getItem(SESSION_KEY) === "true";
}

function showAdmin() {
  loginBox.classList.add("hidden");
  adminBox.classList.remove("hidden");
  fillSettingsForm();
  renderAdminProducts();
}

function showLogin() {
  adminBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
}

function fillSettingsForm() {
  companyNameInput.value = adminData.companyName;
  homeTextInput.value = adminData.homeText;
  phoneInput.value = adminData.contacts.phone;
  emailInput.value = adminData.contacts.email;
  addressInput.value = adminData.contacts.address;
}

function renderAdminProducts() {
  if (!adminData.products.length) {
    adminProductList.innerHTML = '<div class="empty">Товаров пока нет.</div>';
    return;
  }

  adminProductList.innerHTML = adminData.products
    .map((product) => `
      <article class="admin-list-item">
        <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}">
        <div>
          <h3>${escapeHTML(product.name)}</h3>
          <p>${escapeHTML(product.description)}</p>
          <strong>${escapeHTML(product.price)}</strong>
        </div>
        <div class="item-actions">
          <button class="btn primary" type="button" data-edit="${escapeHTML(product.id)}">Edit</button>
          <button class="btn secondary" type="button" data-delete="${escapeHTML(product.id)}">Delete</button>
        </div>
      </article>
    `)
    .join("");
}

function resetProductForm() {
  productIdInput.value = "";
  productNameInput.value = "";
  productDescriptionInput.value = "";
  productPriceInput.value = "";
  productImageInput.value = "";
  productFormTitle.textContent = "Добавить товар";
}

function refreshAfterSave() {
  saveSiteData(adminData);
  renderCommonData(adminData);
  renderAdminProducts();
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const login = document.getElementById("login").value.trim();
  const password = document.getElementById("password").value.trim();

  if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
    localStorage.setItem(SESSION_KEY, "true");
    showAdmin();
    loginForm.reset();
    return;
  }

  alert("Неверный login или password");
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(SESSION_KEY);
  showLogin();
});

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  adminData.companyName = companyNameInput.value.trim();
  adminData.homeText = homeTextInput.value.trim();
  adminData.contacts = {
    phone: phoneInput.value.trim(),
    email: emailInput.value.trim(),
    address: addressInput.value.trim()
  };

  refreshAfterSave();
  alert("Настройки сохранены");
});

productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const product = {
    id: productIdInput.value || `p${Date.now()}`,
    name: productNameInput.value.trim(),
    description: productDescriptionInput.value.trim(),
    price: productPriceInput.value.trim(),
    image: productImageInput.value.trim()
  };

  if (productIdInput.value) {
    adminData.products = adminData.products.map((item) => {
      return item.id === product.id ? product : item;
    });
  } else {
    adminData.products.push(product);
  }

  refreshAfterSave();
  resetProductForm();
});

adminProductList.addEventListener("click", (event) => {
  const editId = event.target.dataset.edit;
  const deleteId = event.target.dataset.delete;

  if (editId) {
    const product = adminData.products.find((item) => item.id === editId);

    productIdInput.value = product.id;
    productNameInput.value = product.name;
    productDescriptionInput.value = product.description;
    productPriceInput.value = product.price;
    productImageInput.value = product.image;
    productFormTitle.textContent = "Редактировать товар";
  }

  if (deleteId && confirm("Удалить товар?")) {
    adminData.products = adminData.products.filter((item) => item.id !== deleteId);
    refreshAfterSave();
  }
});

cancelEditBtn.addEventListener("click", resetProductForm);

if (isLoggedIn()) {
  showAdmin();
} else {
  showLogin();
}
