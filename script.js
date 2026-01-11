const ProductCant = document.querySelector('.productCant');
const loadBtn = document.querySelector('.loadBtn');



function card(data) {

    const box = document.createElement('div');
    box.classList.add('border',  'p-4', 'rounded-lg', 'shadow-md', 'flex', 'flex-col', 'items-start', 'min-w-[400px]', 'max-w-[200px]', 'gap-4');

    box.innerHTML = ` <div class="h-1/2 w-full">
            <img src="${data.thumbnail}"
                alt="${data.title}" class="w-full h-full object-cover rounded-md">
        </div>
        <h3 class="text-2xl text-start font-semibold">${data.title}</h3>

        <p class="text-sm text-start">
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
                <p class="text-3xl font-bold text-gray-800">${data.price}</p>
            </div>

            <button
                class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <i class="fa-solid fa-cart-arrow-down"></i> Add to cart
            </button>
        </div>

`

    // const image = document.createElement('img');
    // const heading = document.createElement('h3');

    // const cant = document.createElement('div');
    // cant.classList.add('flex', 'border-2', 'border-orange-500');
    // const price = document.createElement('p');
    // const rating = document.createElement('p');

    // image.src = data.thumbnail;
    // image.alt = data.title;

    // heading.innerText = data.title;
    // price.innerText = data.price;
    // rating.innerText = data.rating;

    // box.appendChild(image);
    // cant.appendChild(heading);
    // cant.appendChild(price);
    // box.appendChild(cant);
    // box.appendChild(rating)


    return box;
}


async function getProducts() {
    try {

        const item = await axios.get("https://dummyjson.com/products");
        const products = item.data.products;

        console.log(products);


        products.slice(0, 12).forEach(product => {
          ProductCant.appendChild(card(product))
        })
    } catch (err) {
        console.log(err);
    }
}


onload = function() {
    getProducts();
}

