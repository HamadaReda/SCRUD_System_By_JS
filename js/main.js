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

scrud_form.addEventListener("submit", (event) => event.preventDefault());

let allProducts = [];

if (localStorage.getItem("products")) {
  allProducts = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}

function addProduct() {
  let product = {
    name: productName.value,
    category: productCategory.value,
    price: productPrice.value,
    discount: productDiscount.value,
    quantity: productQuantity.value,
    description: productDescription.value,
  };
  allProducts.push(product);
  localStorage.setItem("products", JSON.stringify(allProducts));
  displayProducts();
  clearInputs();
}

function displayProducts() {
  let data = ``;
  for (let i = 0; i < allProducts.length; i++) {
    data += `
      <tr>
        <td class='ps-2'>${allProducts[i].name}</td>
        <td class='ps-2'>${allProducts[i].category}</td>
        <td class='ps-2'>${allProducts[i].price}</td>
        <td class='ps-2'>${allProducts[i].discount}</td>
        <td class='ps-2'>${allProducts[i].quantity}</td>
        <td class='ps-2'>${allProducts[i].description}</td>
        <td class='ps-2'>
          <button class="btn btn-success" onclick="editProduct(${i})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
        <td class='ps-2'>
          <button class="btn btn-danger" onclick="deleteProduct(${i})">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </td>
      </tr>
    `;
  }
  showProducts.innerHTML = data;
}

function deleteProduct(productIndex) {
  allProducts.splice(productIndex, 1);
  localStorage.setItem("products", JSON.stringify(allProducts));
  displayProducts();
}

let tempIndex;
function editProduct(productIndex) {
  let product = allProducts[productIndex];
  productName.value = product.name;
  productCategory.value = product.category;
  productPrice.value = product.price;
  productDiscount.value = product.discount;
  productQuantity.value = product.quantity;
  productDescription.value = product.description;
  addButton.classList.add("d-none");
  updateButton.classList.remove("d-none");
  tempIndex = productIndex;
}

function updateProduct() {
  let product = {
    name: productName.value,
    category: productCategory.value,
    price: productPrice.value,
    discount: productDiscount.value,
    quantity: productQuantity.value,
    description: productDescription.value,
  };
  allProducts.splice(tempIndex, 1, product);
  localStorage.setItem("products", JSON.stringify(allProducts));
  addButton.classList.remove("d-none");
  updateButton.classList.add("d-none");
  displayProducts();
  clearInputs();
}

function clearInputs() {
  scrud_form.reset();
}

searchInput.addEventListener("input", function (event) {
  let nameText = event.target.value;
  let data = ``;
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name.toLowerCase().includes(nameText.toLowerCase())) {
      data += `
      <tr>
        <td>${allProducts[i].name}</td>
        <td class='ps-2'>${allProducts[i].category}</td>
        <td class='ps-2'>${allProducts[i].price}</td>
        <td class='ps-2'>${allProducts[i].discount}</td>
        <td class='ps-2'>${allProducts[i].quantity}</td>
        <td class='ps-2'>${allProducts[i].description}</td>
        <td class='ps-2'>
          <button class="btn btn-success" onclick="editProduct(${i})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
        <td class='ps-2'>
          <button class="btn btn-danger" onclick="deleteProduct(${i})">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </td>
      </tr>
    `;
    }
  }
  showProducts.innerHTML = data;
});
