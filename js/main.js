// Element references
const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");
const productPrice = document.getElementById("productPrice");
const productDiscount = document.getElementById("productDiscount");
const productQuantity = document.getElementById("productQuantity");
const productDescription = document.getElementById("productDescription");
const showProducts = document.getElementById("showProducts");
const addButton = document.getElementById("addButton");
const updateButton = document.getElementById("updateButton");
const searchInput = document.getElementById("searchInput");
const scrud_form = document.getElementById("scrud_form");

// Initial setup
let allProducts = JSON.parse(localStorage.getItem("products")) || [];
let tempIndex = null;

// Event listeners
scrud_form.addEventListener("submit", (event) => event.preventDefault());
addButton.addEventListener("click", addProduct);
updateButton.addEventListener("click", updateProduct);
searchInput.addEventListener("input", filterProducts);

// Display products on load
displayProducts();

// Functions
function addProduct() {
  const product = getProductFromInputs();
  allProducts.push(product);
  updateLocalStorage();
  displayProducts();
  clearInputs();
}

function updateProduct() {
  const product = getProductFromInputs();
  allProducts[tempIndex] = product;
  updateLocalStorage();
  displayProducts();
  toggleButtons();
  clearInputs();
}

function deleteProduct(productIndex) {
  allProducts.splice(productIndex, 1);
  updateLocalStorage();
  displayProducts();
}

function editProduct(productIndex) {
  const product = allProducts[productIndex];
  setInputsFromProduct(product);
  tempIndex = productIndex;
  toggleButtons();
}

function filterProducts(event) {
  const nameText = event.target.value.toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(nameText)
  );
  displayProducts(filteredProducts);
}

function displayProducts(products = allProducts) {
  const data = products
    .map(
      (product, index) => `
    <tr>
      <td class='ps-2'>${product.name}</td>
      <td class='ps-2'>${product.category}</td>
      <td class='ps-2'>${product.price}</td>
      <td class='ps-2'>${product.discount}</td>
      <td class='ps-2'>${product.quantity}</td>
      <td class='ps-2'>${product.description}</td>
      <td class='ps-2'>
        <button class="btn btn-success" onclick="editProduct(${index})">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </td>
      <td class='ps-2'>
        <button class="btn btn-danger" onclick="deleteProduct(${index})">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </td>
    </tr>
  `
    )
    .join("");
  showProducts.innerHTML = data;
}

function getProductFromInputs() {
  return {
    name: productName.value,
    category: productCategory.value,
    price: productPrice.value,
    discount: productDiscount.value,
    quantity: productQuantity.value,
    description: productDescription.value,
  };
}

function setInputsFromProduct(product) {
  productName.value = product.name;
  productCategory.value = product.category;
  productPrice.value = product.price;
  productDiscount.value = product.discount;
  productQuantity.value = product.quantity;
  productDescription.value = product.description;
}

function clearInputs() {
  scrud_form.reset();
}

function toggleButtons() {
  addButton.classList.toggle("d-none");
  updateButton.classList.toggle("d-none");
}

function updateLocalStorage() {
  localStorage.setItem("products", JSON.stringify(allProducts));
}
