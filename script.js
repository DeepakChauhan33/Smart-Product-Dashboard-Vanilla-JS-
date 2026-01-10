const ProductCant = document.querySelector('.productCant');
const loadBtn = document.querySelector('.loadBtn');

loadBtn.addEventListener('click', getProducts);

function card(data) {

    const box = document.createElement('div');
    const image = document.createElement('img');
    const heading = document.createElement('h3');
    const price = document.createElement('span');
    const rating = document.createElement('p');

    image.src = data.thumbnail;
    image.alt = data.title;

    heading.innerText = data.title;
    price.innerText = data.price;
    rating.innerText = data.rating;

    box.appendChild(image);
    box.appendChild(heading);
    box.appendChild(price)
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
