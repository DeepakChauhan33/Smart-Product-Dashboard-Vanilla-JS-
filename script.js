const ProductCant = document.querySelector('.productCant');
const loadBtn = document.querySelector('.loadBtn');

loadBtn.addEventListener('click', getProducts);

function card(data) {

    const box = document.createElement('div');
    box.classList.add('border', 'p-4', 'rounded-lg', 'shadow-md', 'flex', 'flex-col', 'items-center', 'text-center', 'min-w-[400px]', 'max-w-[200px]', 'gap-4');

    const image = document.createElement('img');
    const heading = document.createElement('h3');

    const cant = document.createElement('div');
    cant.classList.add('flex', 'border-2', 'border-orange-500');
    const price = document.createElement('p');
    const rating = document.createElement('p');

    image.src = data.thumbnail;
    image.alt = data.title;

    heading.innerText = data.title;
    price.innerText = data.price;
    rating.innerText = data.rating;

    box.appendChild(image);
    cant.appendChild(heading);
    cant.appendChild(price);
    box.appendChild(cant);
    box.appendChild(rating)


    return box;
}


async function getProducts() {
    try {

        const item = await axios.get("https://dummyjson.com/products");
        const products = item.data.products;

        console.log(products);


        products.slice(0, 10).forEach(product => {
          ProductCant.appendChild(card(product))
        })
    } catch (err) {
        console.log(err);
    }
}
