const Product = document.querySelectorAll('.product');


function card(data){

    const box  = document.createElement('div');
    const image  = document.createElement('img');
    const heading = document.createElement('h3');
    const price = document.createElement('span');
    const rating = document.createElement('p');

    heading.innerText = data.title;


}


async function getData(){
    
    try{
        const res = await axios.get("https://dummyjson.com/products");
        const productList = res.data.products;
        
        productList.forEach(product => {
           body.appendChild(createCard(product));
        });
    }catch(err){
        console.log(err);
    }
}

getData();