const ProductCant = document.querySelector('.productCant');
const loadBtn = document.querySelector('.loadBtn');
const tableBody = document.querySelector('.tableBody');
const totalRow = document.querySelector('.totalRow');
let totalPrice = document.querySelector('.totalPrice');





let cartItemCount = 0;


let allProducts = []; // It will store all products data



function card(data) {

    const box = document.createElement('div');
    box.className = "box";
    box.classList.add('border', 'border-gray-500', 'p-4', 'rounded-lg', 'shadow-md', 'flex', 'flex-col', 'items-start', 'w-[350px]', 'lg:w-[450px]', 'gap-2', 'lg:gap-4',);
    box.dataset.id = data.id;    // To use Event Delegation So I store the value of item, So when I click on the button I can get the id of the product Because we can't pass parameters in Event Delegation
    box.innerHTML = ` 
    
            
    
    <div class="h-[270px] lg:h-[300px] w-full bg-gray-100">
            <img src="${data.thumbnail}"
                alt="${data.title}" class="w-full h-full object-contain rounded-md">
        </div>
        <h3 class="text-sm lg:text-2xl text-start font-semibold">${data.title}</h3>

        <p class="text-[12px] lg:text-sm text-start">
            ${data.description}
        </p>

        <div class="w-full flex justify-between text-sm font-medium text-gray-600 mt-2">
            <p>Brand : <span class="text-md font-medium text-black">${data.brand}</span></p>
            <p>Stock: <span class="text-md font-medium text-black">${data.stock}</span></p>
        </div>


        <div class="w-full flex justify-between text-sm font-medium text-gray-600 mt-2">
            <p>Warranty : <span class="text-md font-medium text-black">${data.warrantyInformation}</span></p>
            <p>Rating: <span class="text-md font-medium text-black">${data.rating}</span></p>
        </div>


        <div class="w-full flex justify-between items-center mt-4">
            <div>
                <p class="text-[16px] font-medium text-gray-700">Price</p>
                <p class="text-xl lg:text-3xl font-bold text-gray-800">$${data.price}</p>
            </div>

            <button
                class="cartBtn flex items-center gap-2 bg-blue-600 text-sm lg:text-[16px] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <i class="fa-solid fa-cart-arrow-down pointer-events-none"></i> Add to cart
            </button>
        </div>`;


    return box;

}




async function getProducts() {
    try {

        const item = await axios.get("https://dummyjson.com/products");
        allProducts = item.data.products;
        const products = item.data.products;
        products.slice(0, 8).forEach(product => {
            ProductCant.appendChild(card(product))
        })
    } catch (err) {
        console.log(err);
    }
}




ProductCant.addEventListener("click", function (e) {   // Event Delegation 

    const btn = e.target.closest(".cartBtn");  //
    if (!btn) return;   // Here we check if the clicked element is not a button then we return without doing anything

    // And if it is a button then we find the closest card div using data-id attribute

    const card = btn.closest(".box");       // Here we get the closest parent element with the class 'box' 
    const productId = Number(card.dataset.id); // Get the product id from data-id attribute and convert it to number

    const productData = allProducts.find(p => p.id === productId); // Find the product data from allProducts array using the id

    addToCart(productData);
    checkCartEmpty();
});





function addToCart(data) {
    const cartItem = document.createElement('tr');
    cartItem.className = "cartItem";

    cartItem.innerHTML = `
       <td>${data.title}</td>
       <td>${data.price}</td>
       <td>
            <button class="removeBtn py-2 px-3 bg-red-500 rounded-md text-white ">Remove</button>
       </td>
    `

    totalPrice.textContent = `$${(Number(totalPrice.textContent.slice(1)) + data.price).toFixed(2)}`;

    cartItemCount++;

    const removeBtn = cartItem.querySelector('.removeBtn');

    removeBtn.addEventListener('click', () => {
        cartItem.remove();
        cartItemCount--;
        totalPrice.textContent = `$${(Number(totalPrice.textContent.slice(1)) - data.price).toFixed(2)}`;
        checkCartEmpty();
    })



    tableBody.appendChild(cartItem);


    // totalRow.classList.remove('hidden');

}




onload = function () {
    getProducts();
}



 function checkCartEmpty() {
       if (cartItemCount > 0){
         totalRow.classList.remove('hidden');
    }else{
            totalRow.classList.add('hidden');
    }


 }