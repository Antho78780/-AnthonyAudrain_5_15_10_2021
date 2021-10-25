const link = fetch(`http://localhost:3000/api/products`);
link.then(reponse => reponse.json())
    .then(productArray => {
        console.log(productArray)
        for (let product of productArray) {
            document.querySelector('#items').innerHTML +=
            `<a href="./product.html?id=${product._id}"><article><img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productname>"${product.name}"</h3><p class="productDescription">"${product.description}"</p></article></a>`
        }
    })
   
   
  













