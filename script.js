/*************************************************
 * DOM ELEMENT REFERENCES
 *************************************************/
const ProductCant = document.querySelector('.productCant');
const loadBtn = document.querySelector('.loadBtn');
const tableBody = document.querySelector('.tableBody');
const totalRow = document.querySelector('.totalRow');
let totalPrice = document.querySelector('.totalPrice');
const searchInput = document.querySelector(".searchInput");
const cartText = document.querySelector(".cartText");
const table = document.querySelector(".table");
const infoBtn = document.querySelector(".infoBtn");
const infoIcon = document.querySelector(".infoIcon");


/*************************************************
 * GLOBAL STATE VARIABLES
 *************************************************/
let cartItemCount = 0;
let allProducts = []; // Stores all fetched products (used for search & cart)


/*************************************************
 * DEBOUNCE UTILITY FUNCTION
 * Prevents excessive function calls (search input)
 *************************************************/
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}


/*************************************************
 * PRODUCT CARD CREATION FUNCTION
 * Creates and returns a product card DOM element
 *************************************************/
function card(data) {
  const box = document.createElement('div');

  box.className = "box";
  box.classList.add(
    'border', 'border-gray-500', 'p-4', 'rounded-lg',
    'shadow-md', 'flex', 'flex-col', 'items-start',
    'w-[350px]', 'lg:w-[450px]', 'gap-2', 'lg:gap-4'
  );

  // Store product ID for Event Delegation
  box.dataset.id = data.id;

  box.innerHTML = `
    <div class="h-[270px] lg:h-[300px] w-full bg-gray-100">
      <img src="${data.thumbnail}" alt="${data.title}"
        class="w-full h-full object-contain rounded-md">
    </div>

    <h3 class="text-sm lg:text-2xl font-semibold">${data.title}</h3>

    <p class="text-[12px] lg:text-sm">${data.description}</p>

    <div class="w-full flex justify-between text-sm text-gray-600">
      <p>Brand: <span class="text-black">${data.brand}</span></p>
      <p>Stock: <span class="text-black">${data.stock}</span></p>
    </div>

    <div class="w-full flex justify-between text-sm text-gray-600">
      <p>Warranty: <span class="text-black">${data.warrantyInformation}</span></p>
      <p>Rating: <span class="text-black">${data.rating}</span></p>
    </div>

    <div class="w-full flex justify-between items-center mt-4">
      <div>
        <p class="text-gray-700">Price</p>
        <p class="text-2xl font-bold">$${data.price}</p>
      </div>

      <button class="cartBtn bg-blue-600 text-white px-4 py-2 rounded-lg">
        Add to cart
      </button>
    </div>
  `;

  return box;
}


/*************************************************
 * SEARCH PRODUCTS FUNCTION
 * Filters products based on input value
 *************************************************/
function searchProducts(query) {
  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  ProductCant.innerHTML = "";

  let fitlerProduct = filtered.forEach(product => {
    ProductCant.appendChild(card(product));
  });

  if (filtered.length === 0) {
    ProductCant.innerHTML = "<p class='text-xl'>No products found :( </p>";
  }
}


/*************************************************
 * FETCH PRODUCTS FROM API
 *************************************************/
async function getProducts() {
  try {
    const item = await axios.get("https://dummyjson.com/products");

    allProducts = item.data.products;

    allProducts.slice(0, 30).forEach(product => {
      ProductCant.appendChild(card(product));
    });

  } catch (err) {
    console.log(err);
  }
}


/*************************************************
 * ADD PRODUCT TO CART
 *************************************************/
function addToCart(data) {
  const cartItem = document.createElement('tr');
  cartItem.className = "cartItem";

  cartItem.innerHTML = `
    <td>${data.title}</td>
    <td>${data.price}</td>
    <td>
      <button class="removeBtn bg-red-500 text-white px-3 py-2 rounded-md">
        Remove
      </button>
    </td>
  `;

  // Update total price
  totalPrice.textContent =
    `$${(Number(totalPrice.textContent.slice(1)) + data.price).toFixed(2)}`;

  cartItemCount++;

  const removeBtn = cartItem.querySelector('.removeBtn');

  removeBtn.addEventListener('click', () => {
    cartItem.remove();
    cartItemCount--;

    totalPrice.textContent =
      `$${(Number(totalPrice.textContent.slice(1)) - data.price).toFixed(2)}`;

    checkCartEmpty();
  });

  tableBody.appendChild(cartItem);
}


/*************************************************
 * CHECK IF CART IS EMPTY
 * Shows / hides total row
 *************************************************/
function checkCartEmpty() {
  if (cartItemCount > 0) {
    cartText.classList.add('hidden');
    totalRow.classList.remove('hidden');
    table.classList.remove('hidden');
  } else {
    totalRow.classList.add('hidden');
    cartText.classList.remove('hidden'); 
    table.classList.add('hidden');
  }
}


/*************************************************
 * EVENT DELEGATION FOR ADD TO CART BUTTON
 *************************************************/
ProductCant.addEventListener("click", function (e) {
  const btn = e.target.closest(".cartBtn");
  if (!btn) return;

  const cardElement = btn.closest(".box");
  const productId = Number(cardElement.dataset.id);

  const productData = allProducts.find(p => p.id === productId);

  addToCart(productData);
  checkCartEmpty();
});


/*************************************************
 * SEARCH INPUT EVENT (DEBOUNCED)
 *************************************************/
const debouncedSearch = debounce(searchProducts, 500);
searchInput.addEventListener("input", e => {
  debouncedSearch(e.target.value);
});



/*************************************************
 * INFO BUTTON FUNCTIONALITY
 ************************************************/

infoBtn.addEventListener("click", () => {

  console.log("CLicked")
  infoIcon.classList.toggle("hidden");

  infoBtn.innerHTML = `

    
    <p class="text-sm lg:text-base ">
      This is a demo Smart Product Dashboard built using
      Vanilla JS, Tailwind CSS, and Axios. It fetches
      product data from a public API and allows users
      to search products and add them to a cart.
    </p>
  `;


})


/*************************************************
 * INITIAL LOAD
 *************************************************/
window.onload = function () {
  getProducts();
};
